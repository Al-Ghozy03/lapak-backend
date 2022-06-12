const { Op } = require("sequelize");
const { sequelize } = require("../models");
const { QueryTypes } = require("sequelize");
const barangmodel = require("../models").barangs;
const cloudinary = require("cloudinary").v2;
require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.SECRET_API_KEY,
});

async function getBarangDiskon(req, res) {
  try {
    const { orderBy } = req.query;
    const data = await sequelize.query(
      `select barangs.id,barangs.store_id,stores.owner,stores.nama_toko,stores.daerah,stores.photo_profile as foto_toko,barangs.nama_barang,barangs.harga,barangs.deskripsi,barangs.kategori,barangs.foto_barang,barangs.diskon from stores join barangs on stores.id = barangs.store_id where barangs.diskon = 30 order by barangs.harga ${orderBy}`,
      {
        type: QueryTypes.SELECT,
        raw: true,
      }
    );
    return res.json({ data });
  } catch (er) {
    console.log(er);
    return res.status(442).json({ er });
  }
}

async function deleteBarang(req, res) {
  try {
    const data = await barangmodel.findOne({ where: { id: req.params.id } });
    if (!data) return res.status(404).json({ message: "data tidak ditemukan" });
    await barangmodel.destroy({ where: { id: req.params.id } });
    return res.json({ message: "berhasil menghapus data" });
  } catch (er) {
    console.log(er);
    return res.status(442).json({ er });
  }
}

async function getRandom(req, res) {
  try {
    const data = await sequelize.query(
      `select barangs.id,barangs.store_id,stores.owner,stores.nama_toko,stores.daerah,stores.photo_profile as foto_toko,barangs.nama_barang,barangs.harga,barangs.deskripsi,barangs.kategori,barangs.foto_barang,barangs.diskon from stores join barangs on stores.id = barangs.store_id order by RANDOM() limit 5`,
      {
        type: QueryTypes.SELECT,
        raw: true,
      }
    );
    res.json({ data });
  } catch (er) {
    console.log(er);
    return res.status(442).json({ er });
  }
}

async function getBarangByKategori(req, res) {
  try {
    let { orderBy, cat } = req.query;
    const data = await sequelize.query(
      `select barangs.id,barangs.store_id,stores.owner,stores.nama_toko,stores.daerah,stores.photo_profile as foto_toko,barangs.nama_barang,barangs.harga,barangs.deskripsi,barangs.kategori,barangs.foto_barang from stores left join barangs on stores.id = barangs.store_id where barangs.kategori = "${cat}" order by barangs.harga ${orderBy}`,
      {
        type: QueryTypes.SELECT,
        raw: true,
      }
    );
    res.json({ data });
  } catch (er) {
    console.log(er);
    return res.status(442).json({ er });
  }
}

async function searchBarang(req, res) {
  try {
    let { orderBy, item } = req.query;
    const data = await sequelize.query(
      `select barangs.id,barangs.store_id,stores.owner,stores.nama_toko,stores.daerah,stores.photo_profile as foto_toko,barangs.nama_barang,barangs.harga,barangs.deskripsi,barangs.kategori,barangs.foto_barang from stores left join barangs on stores.id = barangs.store_id where barangs.nama_barang like "${item}" order by barangs.harga ${orderBy}`,
      {
        type: QueryTypes.SELECT,
        raw: true,
      }
    );
    res.json({ data });
  } catch (er) {
    console.log(er);
    return res.status(442).json({ er });
  }
}
async function barangInfo(req, res) {
  try {
    const data = await barangmodel.findOne({ where: { id: req.params.id } });
    if (!data) return res.status(404).json({ message: "data tidak ditemukan" });
    res.status(200).json({ data });
  } catch (er) {
    console.log(er);
    res.status(442).json({ er });
  }
}

async function updateBarang(req, res) {
  try {
    let body = req.body;
    const { id } = req.params;
    const data = await barangmodel.findOne({ where: { id: id } });
    if (!data) return res.status(404).json({ message: "data tidak ditemukan" });
    if (req.file?.path === undefined) {
      body.foto_barang = data.foto_barang;
    } else {
      const { secure_url } = await cloudinary.uploader.upload(req.file.path, {
        folder: "/lapak/barang",
      });
      body.foto_barang = secure_url;
    }
    await barangmodel.update(body, { where: { id: id } });
    res.status(200).json({ message: "berhasil" });
  } catch (er) {
    console.log(er);
    return res.status(442).json({ er });
  }
}

async function getBarangFromStore(req, res) {
  try {
    const data = await barangmodel.findAndCountAll({
      where: { store_id: req.params.id },
    });
    res.json({ data });
  } catch (er) {
    console.log(er);
    res.status(442).json({ er });
  }
}

async function createBarang(req, res) {
  try {
    let body = req.body;
    const { secure_url } = await cloudinary.uploader.upload(req.file.path, {
      folder: "/lapak/barang",
    });
    body.foto_barang = secure_url;
    await barangmodel.create(body);
    res.json({ message: "berhasil" });
  } catch (er) {
    console.log(er);
    return res.status(442).json({ er });
  }
}

module.exports = {
  createBarang,
  getBarangFromStore,
  updateBarang,
  barangInfo,
  searchBarang,
  getBarangByKategori,
  getRandom,
  deleteBarang,
  getBarangDiskon,
};
