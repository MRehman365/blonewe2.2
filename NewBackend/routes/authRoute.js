const userAuthController = require("../controller/authentication/userAuthController");

const router = require("express").Router();

router.post("/register", userAuthController.register)
router.post("/login", userAuthController.login)
router.get("/logout", userAuthController.logout)
router.get("/getuserbyid", userAuthController.getUserById)

module.exports = router;