const { register, login, profile, updateProfile, profileChat } = require("../controller/user_controller")
const { jwtMiddle } = require("../middleware/jwt_middleware")
const { upload } = require("../middleware/upload_user")
const router = require("express")()

router.post("/register",register)
router.post("/login",login)
router.use(jwtMiddle)
router.get("/profile",profile)
router.get("/profile-chat/:id",profileChat)
router.put("/update",upload.single("photo_profile"),updateProfile)

module.exports = {userRouter:router}