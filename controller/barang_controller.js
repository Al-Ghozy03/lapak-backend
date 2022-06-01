const { Op } = require("sequelize");
const { sequelize } = require("../models");
const { QueryTypes } = require("sequelize");
const barangmodel = require("../models").barangs;
const notifmodel = require("../models").notifications;
const storemodel = require("../models").stores;

async function getRandom(req, res) {
  try {
    const data = await sequelize.query(
      `select barangs.id,barangs.store_id,stores.owner,stores.nama_toko,stores.daerah,stores.photo_profile as foto_toko,barangs.nama_barang,barangs.harga,barangs.deskripsi,barangs.kategori,barangs.foto_barang,barangs.berat_barang,barangs.diskon from stores join barangs on stores.id = barangs.store_id order by RAND() limit 5`,
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

async function sendNotif(data) {
  try {
    return console.log(data);
  } catch (er) {
    return console.log(er);
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
      `select barangs.id,barangs.store_id,stores.owner,stores.nama_toko,stores.daerah,stores.photo_profile as foto_toko,barangs.nama_barang,barangs.harga,barangs.deskripsi,barangs.kategori,barangs.foto_barang from stores left join barangs on stores.id = barangs.store_id where barangs.nama_barang like "%${item}%" order by barangs.harga ${orderBy}`,
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
    const data = barangmodel.findOne({ where: { id: req.params.id } });
    if (!data) return res.status(404).json({ message: "data tidak ditemukan" });
    if (req.file?.path === undefined) {
      body.foto_barang = data.foto_barang;
    } else {
      body.foto_barang = req.file.path;
    }
    await barangmodel.update(body, { where: { id: req.params.id } });
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
    body.foto_barang = req.file?.path;
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
  sendNotif,
  searchBarang,
  getBarangByKategori,
  getRandom,
};
