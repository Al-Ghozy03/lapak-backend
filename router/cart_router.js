const { addCart, getItemFromCart, deleteItem } = require("../controller/cart_controller");

const router = require("express")();

router.post("/add/:id", addCart);
router.get("/get",getItemFromCart)
router.delete("/delete/:id",deleteItem)
module.exports = { cartRouter: router };
