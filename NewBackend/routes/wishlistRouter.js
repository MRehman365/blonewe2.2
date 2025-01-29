const wishlist = require("../controller/wishlist/wishlist");
const { isAuthenticatedUser } = require("../middleware/validation");

const router = require("express").Router();

router.post("/addwishlist", wishlist.addToWishlist);
router.delete("/deletewishlist/:id", wishlist.deleteWishlist);
router.get("/getwishlist/:userId", wishlist.getWishlist);

module.exports = router;