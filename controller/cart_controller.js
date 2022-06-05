const { default: jwtDecode } = require("jwt-decode");
const { sequelize } = require("../models");
const { QueryTypes } = require("sequelize");
const cartmodel = require("../models").carts;

async function deleteItem(req, res) {
  try {
    const data = await cartmodel.findOne({ where: { id: req.params.id } });
    if (!data) return res.status(404).json({ message: "data tidak ditemukan" });
    await cartmodel.destroy({ where: { id: req.params.id } });
    res.status(200).json({ message: "berhasil" });
  } catch (er) {
    console.log(er);
    return res.status(442).json({ er });
  }
}

async function getItemFromCart(req, res) {
  try {
    const data = await sequelize.query(
      `select carts.id,carts.barang_id,carts.user_id,barangs.store_id,barangs.nama_barang,barangs.harga,stores.daerah,stores.owner,barangs.deskripsi,barangs.kategori,barangs.diskon,barangs.foto_barang,stores.nama_toko,stores.photo_profile as foto_toko from carts left join barangs on carts.barang_id = barangs.id left join users on carts.user_id = users.id left join stores on barangs.store_id = stores.id where users.id = ${
        jwtDecode(req.headers.authorization).id
      }`,
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

async function addCart(req, res) {
  try {
    const data = await cartmodel.findOne({
      where: {
        barang_id: req.params.id,
        user_id: jwtDecode(req.headers.authorization).id,
      },
    });
    if (data)
      return res.status(442).json({ message: "data sudah ditambahkan" });
    await cartmodel.create({
      barang_id: req.params.id,
      user_id: jwtDecode(req.headers.authorization).id,
    });
    res.json({ message: "berhasil" });
  } catch (er) {
    console.log(er);
    res.status(442).json({ er });
  }
}

module.exports = { addCart, getItemFromCart, deleteItem };
