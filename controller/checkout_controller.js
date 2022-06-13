const { default: jwtDecode } = require("jwt-decode");
const { Op } = require("sequelize");
const { QueryTypes } = require("sequelize");
const { sequelize } = require("../models");
const ordermodel = require("../models").orders;
const usermodel = require("../models").users;
const notifmodel = require("../models").notifications;
const barangmodel = require("../models").barangs;
const storemodel = require("../models").stores;

async function getNotif(req, res) {
  try {
    const data = await sequelize.query(
      `select notif.id as notif_id,notif.from,notif.to,notif.message,notif.is_read,users.name,users.photo_profile,notif.created_at from notifications as notif join users on notif.from = users.id where notif.to = ${
        jwtDecode(req.headers.authorization).id
      }`,
      {
        type: QueryTypes.SELECT,
        raw: true,
      }
    );
    return res.status(200).json({ data });
  } catch (er) {
    console.log(er);
    return res.status(442).json({ er });
  }
}

async function sendNotif(data) {
  console.log(data);
  await notifmodel.create({
    from: data.from,
    message: data.message,
    to: data.to,
    created_at: Date(Date.now()),
  });
}

async function barangSampai(req, res) {
  try {
    const data = await ordermodel.findOne({ where: { id: req.params.id } });
    if (!data) return res.status(404).json({ message: "data tidak ditemukan" });
    await ordermodel.update(
      { is_paid: true },
      { where: { id: req.params.id } }
    );
    return res.status(200).json({ message: "berhasil" });
  } catch (er) {
    console.log(er);
    return res.status(442).json({ er });
  }
}

async function getOrder(req, res) {
  try {
    const data = await storemodel.findAll({
      attributes: [
        "id",
        "owner",
        "nama_toko",
        "daerah",
        ["photo_profile", "foto_toko"],
      ],
      include: [
        {
          model: barangmodel,
          require: true,
          as: "item",
          attributes: [
            "id",
            "store_id",
            "nama_barang",
            "harga",
            "deskripsi",
            "kategori",
            "diskon",
            "foto_barang",
          ],
          include: [
            {
              model: ordermodel,
              as: "order_barang",
              require: true,
              attributes: [
                "id",
                "user_id",
                "total_barang",
                "total_harga",
                "alamat",
                "is_paid",
              ],
              where: {
                user_id: jwtDecode(req.headers.authorization).id,
                is_paid: false,
              },
              include: [
                {
                  model: usermodel,
                  require: true,
                  as: "order_user",
                  attributes: ["id", "name", "email", "photo_profile"],
                },
              ],
            },
          ],
        },
      ],
    });
    // const data = await sequelize.query(
    //   `select orders.id,orders.user_id,orders.barang_id,barangs.store_id,stores.daerah,orders.total_barang,orders.total_harga,orders.alamat,orders.is_paid,barangs.nama_barang,barangs.harga,barangs.deskripsi,barangs.kategori,barangs.diskon,barangs.foto_barang,stores.owner,stores.nama_toko,stores.photo_profile as foto_toko from orders join users on users.id = orders.user_id join barangs on orders.barang_id = barangs.id join stores on stores.id = barangs.store_id where users.id = ${
    //     jwtDecode(req.headers.authorization).id
    //   } and orders.is_paid = 0`,
    //   {
    //     type: QueryTypes.SELECT,
    //     raw: true,
    //   }
    // );
    // if (!data) return res.status(404).json({ message: "data tidak ditemukan" });
    res.status(200).json({ data });
  } catch (er) {
    console.log(er);
    return res.status(442).json({ er });
  }
}

async function pesan(req, res) {
  try {
    let body = req.body;
    const owner = await usermodel.findOne({ where: { id: body.owner_barang } });
    const data = await ordermodel.create({
      user_id: jwtDecode(req.headers.authorization).id,
      owner_barang: owner.id,
      barang_id: body.barang_id,
      total_barang: body.total_barang,
      total_harga: body.total_harga,
      alamat: body.alamat,
    });
    res.json({ message: "berhasil", data });
  } catch (er) {
    console.log(er);
    return res.status(442).json({ er });
  }
}
module.exports = { pesan, getOrder, barangSampai, sendNotif, getNotif };
