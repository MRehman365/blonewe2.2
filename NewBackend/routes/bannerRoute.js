const express = require("express");
const { getbanners, addOrUpdateBanner } = require("../controller/banners/bannerController");
const router = express.Router();

router.post('/addbanner', addOrUpdateBanner);
router.get('/getbanner', getbanners);

module.exports = router;