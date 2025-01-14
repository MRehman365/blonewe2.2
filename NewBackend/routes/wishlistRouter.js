const wishlist = require("../controller/wishlist/wishlist");

const router = require("express").Router();

router.post("/addwishlist", wishlist.addToWishlist);
router.delete("/deletewishlist/:id", wishlist.deleteWishlist);
router.get("/getwishlist/:id", wishlist.getWishlist);

module.exports = router;