const { check } = require("express-validator");
const usermodel = require("../models").users;
const userValidator = [
  check("name").isLength({ min: 1 }).withMessage("nama wajib diisi"),
  check("password").isLength({ min: 1 }).withMessage("password wajib diisi"),
  check("email")
    .isEmail()
    .withMessage("masukan email yang valid")
    .custom((value) =>
      usermodel.findOne({ where: { email: value } }).then((user) => {
        if (user) return Promise.reject("email telah digunakan");
      })
    ),
  check("phone")
    .isNumeric()
    .withMessage("masukan angka")
    .custom((value) =>
      usermodel.findOne({ where: { phone: value } }).then((user) => {
        if (user) return Promise.reject("Nomer hp sudah digunakan");
      })
    ),
  check("alamat").isLength({ min: 1 }).withMessage("alamat wajib diisi"),
];

module.exports = { userValidator };
