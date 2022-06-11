const { jwtMiddle } = require("../middleware/jwt_middleware");
const { upload } = require("../middleware/upload");
const { barangRouter } = require("./barang_router");
const { cartRouter } = require("./cart_router");
const { chatRouter } = require("./chat_router");
const { checkoutRouter } = require("./payment_router");
const { storeRouter } = require("./store_router");
const { userRouter } = require("./user_router");
const cloudinary = require("cloudinary").v2;
require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.SECRET_API_KEY,
});
const router = require("express")();

router.post("/post", upload.single("img"), async (req, res) => {
  try {
    const data = await cloudinary.uploader.upload(req.file.path,{folder:"/testing"});
    res.send({ url: data.secure_url });
  } catch (er) {
    console.log(er);
  }
});
router.use("/user", userRouter);
router.get("/", (req, res) => res.json({ message: "berhasil" }));
router.use(jwtMiddle);
router.use("/store", storeRouter);
router.use("/barang", barangRouter);
router.use("/cart", cartRouter);
router.use("/checkout", checkoutRouter);
router.use("/chat", chatRouter);

module.exports = { router };
