const {
  createStore,
  detailStore,
  updateStore,
} = require("../controller/store_controller");
const { upload } = require("../middleware/upload_store");

const router = require("express")();

router.post("/create", upload.single("photo_profile"), createStore);
router.get("/info/:id", detailStore);
router.put("/update/:id", upload.single("photo_profile"), updateStore);
module.exports = { storeRouter: router };

