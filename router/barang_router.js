const {
  createBarang,
  updateBarang,
  barangInfo,
  getBarangFromStore,
  searchBarang,
  getBarangByKategori,
  getRandom,
  deleteBarang,
  getBarangDiskon,
  testing,
} = require("../controller/barang_controller");
const { upload } = require("../middleware/upload");

const router = require("express")();

router.post("/create", upload.single("foto_barang"), createBarang);
router.get("/get-barang-store/:id", getBarangFromStore);
router.put("/update/:id", upload.single("foto_barang"), updateBarang);
router.get("/info/:id", barangInfo);
router.get("/search", searchBarang);
router.get("/kategori", getBarangByKategori);
router.get("/rekomendasi", getRandom);
router.delete("/delete/:id", deleteBarang);
router.get("/diskon-30", getBarangDiskon);
router.get("/testing",testing)
module.exports = { barangRouter: router };
