const { pesan, getOrder, barangSampai, getNotif, sendNotif } = require("../controller/checkout_controller");

const router = require("express")();

router.post("/order", pesan);
router.get("/get", getOrder);
router.put("/update/:id",barangSampai)
router.get("/notif",getNotif)
router.post("send-notif",sendNotif)

module.exports = { checkoutRouter: router };
