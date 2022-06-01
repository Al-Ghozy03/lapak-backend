const { pesan, getOrder, barangSampai } = require("../controller/checkout_controller");

const router = require("express")();

router.post("/order", pesan);
router.get("/get", getOrder);
router.put("/update/:id",barangSampai)

module.exports = { checkoutRouter: router };
