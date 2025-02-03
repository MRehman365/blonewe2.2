const express = require("express");
const { addcoupen, getcoupen, getCouponByCode, deleteCoupen } = require("../controller/coupen/coupenController");
const router = express.Router();

router.post("/createcoupen", addcoupen);
router.get("/getallcoupen", getcoupen);
router.get("/getcoupen/:code", getCouponByCode);
router.delete("/deletecoupen/:id", deleteCoupen);

module.exports = router;