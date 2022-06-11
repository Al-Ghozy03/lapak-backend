const jwt = require("jsonwebtoken");
const usermodel = require("../models").users;
const bcrypt = require("bcrypt");
const { default: jwtDecode } = require("jwt-decode");
const cloudinary = require("cloudinary").v2;
require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.SECRET_API_KEY,
});

async function updateProfile(req, res) {
  try {
    const data = usermodel.findOne({
      where: { id: jwtDecode(req.headers.authorization).id },
    });
    if (!data) return res.status(404).json({ message: "user tidak ditemukan" });
    let body = req.body;

    if (req.file?.path === undefined) {
      body.photo_profile = data.photo_profile;
    } else {
      const url = await cloudinary.uploader.upload(req.file.path, {
        folder: "/lapak/user",
      });
      body.photo_profile = url.secure_url;
    }

    if (body.password != undefined) {
      body.password = bcrypt.hashSync(body.password, 10);
    } else {
      body.password = data.password;
    }
    await usermodel.update(body, {
      where: { id: jwtDecode(req.headers.authorization).id },
    });
    res.status(200).json({ message: "berhasil" });
  } catch (er) {
    console.log(er);
    return res.status(442).json({ er });
  }
}

async function profileChat(req, res) {
  try {
    const data = await usermodel.findOne({
      where: { id: req.params.id },
    });
    if (!data) return res.status(404).json({ message: "user tidak ditemukan" });
    res.status(200).json({ data });
  } catch (er) {
    console.log(er);
    return res.status(442).json({ er });
  }
}

async function profile(req, res) {
  try {
    const data = await usermodel.findOne({
      where: { id: jwtDecode(req.headers.authorization).id },
    });
    if (!data) return res.status(404).json({ message: "user tidak ditemukan" });
    res.status(200).json({ data });
  } catch (er) {
    console.log(er);
    return res.status(442).json({ er });
  }
}

async function login(req, res) {
  try {
    let { email, password } = req.body;
    const data = await usermodel.findOne({ where: { email: email } });
    if (!data) return res.status(404).json({ message: "user tidak ditemukan" });
    const verify = bcrypt.compareSync(password, data.password);
    if (!verify) return res.status(442).json({ message: "password salah" });
    const token = jwt.sign({ id: data.id }, process.env.JWT_SIGN);
    res.status(200).json({ message: "berhasil", token, data });
  } catch (er) {
    console.log(er);
    return res.status(442).json({ er });
  }
}

async function register(req, res) {
  try {
    let body = req.body;
    const checkEmail = await usermodel.findOne({
      where: { email: body.email },
    });
    if (checkEmail)
      return res.status(442).json({ message: "email sudah digunakan" });
    const checkPhone = await usermodel.findOne({
      where: { phone: body.phone },
    });
    if (checkPhone)
      return res.status(442).json({ message: "nomer hp sudah digunakan" });
    body.password = bcrypt.hashSync(body.password, 10);
    body.phone = parseInt(body.phone);
    const data = await usermodel.create(body);
    const token = jwt.sign({ id: data.id }, process.env.JWT_SIGN);
    res.json({ message: "berhasil", token, data });
  } catch (er) {
    console.log(er);
    return res.status(442).json({ er });
  }
}

module.exports = { register, login, profile, updateProfile, profileChat };
