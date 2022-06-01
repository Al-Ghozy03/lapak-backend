const {
  createBarang,
  updateBarang,
  barangInfo,
  getBarangFromStore,
  searchBarang,
  getBarangByKategori,
  getRandom,
} = require("../controller/barang_controller");
const { upload } = require("../middleware/upload_barang");

const router = require("express")();

router.post("/create", upload.single("foto_barang"), createBarang);
router.get("/get-barang-store/:id", getBarangFromStore);
router.put("/update/:id", upload.single("foto_barang"), updateBarang);
router.get("/info/:id", barangInfo);
router.get("/search", searchBarang);
router.get("/kategori", getBarangByKategori);
router.get("/rekomendasi", getRandom);

module.exports = { barangRouter: router };
