const { jwtMiddle } = require("../middleware/jwt_middleware");
const { barangRouter } = require("./barang_router");
const { cartRouter } = require("./cart_router");
const { checkoutRouter } = require("./payment_router");
const { storeRouter } = require("./store_router");
const { userRouter } = require("./user_router");

const router = require("express")();
router.use("/user", userRouter);
router.use(jwtMiddle);
router.use("/store", storeRouter);
router.use("/barang", barangRouter);
router.use("/cart", cartRouter);
router.use("/checkout", checkoutRouter);

module.exports = { router };
