const { register, login, profile, updateProfile } = require("../controller/user_controller")
const { jwtMiddle } = require("../middleware/jwt_middleware")
const { upload } = require("../middleware/upload_user")
const { middlewareValidation } = require("../middleware/validator_middleware")
const { userValidator } = require("../validator/user_validator")
const router = require("express")()

router.post("/register",userValidator,middlewareValidation,register)
router.post("/login",login)
router.use(jwtMiddle)
router.get("/profile",profile)
router.put("/update",upload.single("photo_profile"),updateProfile)

module.exports = {userRouter:router}