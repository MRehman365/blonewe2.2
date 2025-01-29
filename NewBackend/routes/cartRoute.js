const router = require("express").Router();
const cartController = require("../controller/cart/cartController");
const { isAuthenticatedUser } = require("../middleware/validation");

router.post("/addtocart", cartController.addToCart);
router.get("/getcart/:userId", cartController.getCart);
router.delete("/deletecart/:id", cartController.deleteCart);
router.put("/increasequantity/:id", cartController.increaseQuantity);
router.put("/decreasequantity/:id", cartController.decreaseQuantity);


module.exports = router;