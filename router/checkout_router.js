const { pesan, getOrder, barangSampai, getNotif } = require("../controller/checkout_controller");

const router = require("express")();

router.post("/order", pesan);
router.get("/get", getOrder);
router.put("/update/:id",barangSampai)
router.get("/notif",getNotif)

module.exports = { checkoutRouter: router };
