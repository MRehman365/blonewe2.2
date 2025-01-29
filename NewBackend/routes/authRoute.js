const adminAuthController = require("../controller/authentication/adminAuthController");
const userAuthController = require("../controller/authentication/userAuthController");

const router = require("express").Router();

router.post("/register", userAuthController.register)
router.post("/login", userAuthController.login)
router.get("/logout", userAuthController.logout)
router.get("/getuserbyid/:id", userAuthController.getUserById)
router.get("/getallusers", userAuthController.getAllUsers)
router.post("/adduseraddress", userAuthController.AdduserAddress)
router.get("/getaddressbyid/:id", userAuthController.getAddressById)

// admin apis

router.post("/adminregister", adminAuthController.admin_register)
router.post("/adminlogin", adminAuthController.admin_login)
router.get("/adminlogout", adminAuthController.admin_logout)
router.get("/getadminbyid", adminAuthController.getadminById)

module.exports = router;