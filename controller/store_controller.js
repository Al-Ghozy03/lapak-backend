const { default: jwtDecode } = require("jwt-decode");
const storemodel = require("../models").stores;
const usermodel = require("../models").users;
const barangmodel = require("../models").barangs;
const cloudinary = require("cloudinary").v2;
require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.SECRET_API_KEY,
});

async function updateStore(req, res) {
  try {
    let { nama_toko, daerah, photo_profile } = req.body;
    const data = await storemodel.findOne({ where: { id: req.params.id } });
    if (!data) return res.status(404).json({ message: "data tidak ditemukan" });
    if (req.file?.path === undefined) {
      photo_profile = data.photo_profile;
    } else {
      const { secure_url } = await cloudinary.uploader.upload(req.file.path, {
        folder: "/lapak/toko",
      });
      photo_profile = secure_url;
    }
    await storemodel.update(
      {
        nama_toko: nama_toko,
        daerah: daerah,
        photo_profile: photo_profile,
      },
      { where: { id: req.params.id } }
    );
    res.status(200).json({ message: "berhasil" });
  } catch (er) {
    console.log(er);
    return res.status(442).json({ er });
  }
}

async function detailStore(req, res) {
  try {
    const data = await storemodel.findOne({
      where: { id: req.params.id },
      include: [
        {
          model: barangmodel,
          require: true,
          as: "barang",
        },
      ],
    });
    if (!data) return res.status(404).json({ message: "data tidak ditemukan" });
    res.status(200).json({ data });
  } catch (er) {
    console.log(er);
    return res.status(442).json({ er });
  }
}

async function createStore(req, res) {
  try {
    let body = req.body;
    const url = await cloudinary.uploader.upload(req.file.path, {
      folder: "/lapak/toko",
    });
    const data = await storemodel.create({
      owner: jwtDecode(req.headers.authorization).id,
      nama_toko: body.nama_toko,
      daerah: body.daerah,
      photo_profile: url.secure_url,
    });
    await usermodel.update(
      { hasStore: true, store_id: data.id },
      { where: { id: jwtDecode(req.headers.authorization).id } }
    );
    res.json({ message: "berhasil", data });
  } catch (er) {
    console.log(er);
    return res.status(442).json({ er });
  }
}
module.exports = { createStore, detailStore, updateStore };
