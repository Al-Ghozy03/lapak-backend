const { pesan, getOrder, barangSampai, getNotif, counterNotif } = require("../controller/checkout_controller");

const router = require("express")();

router.post("/order", pesan);
router.get("/get", getOrder);
router.put("/update/:id",barangSampai)
router.get("/notif",getNotif)
router.get("/counter/:id",counterNotif)

module.exports = { checkoutRouter: router };
