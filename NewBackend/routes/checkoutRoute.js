const express = require("express");
const { createCheckout, getAllCheckouts, getCheckoutById, updateCheckout, deleteCheckout } = require("../controller/checkout/checkoutController");
const router = express.Router();

router.post("/createcheckouts", createCheckout);
router.get("/getallcheckouts", getAllCheckouts);
router.get("/getcheckouts/:id", getCheckoutById);
router.put("/updatecheckouts/:id", updateCheckout);
router.delete("/deletecheckouts/:id", deleteCheckout);

module.exports = router;