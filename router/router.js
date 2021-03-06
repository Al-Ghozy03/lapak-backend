const { jwtMiddle } = require("../middleware/jwt_middleware");
const { upload } = require("../middleware/upload");
const { barangRouter } = require("./barang_router");
const { cartRouter } = require("./cart_router");
const { chatRouter } = require("./chat_router");
const { checkoutRouter } = require("./checkout_router");
const { storeRouter } = require("./store_router");
const { userRouter } = require("./user_router");
const router = require("express")();

router.get("/", (req, res) => res.json({ message: "berhasil" }));
router.use("/user", userRouter);
router.use(jwtMiddle);
router.use("/store", storeRouter);
router.use("/barang", barangRouter);
router.use("/cart", cartRouter);
router.use("/checkout", checkoutRouter);
router.use("/chat", chatRouter);

module.exports = { router };
