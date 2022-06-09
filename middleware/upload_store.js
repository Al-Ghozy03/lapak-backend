const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.SECRET_API_KEY,
  secure:true,
});


const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "/lapak/store",
  },

});

const upload = multer({ storage: storage });
module.exports = { upload };
