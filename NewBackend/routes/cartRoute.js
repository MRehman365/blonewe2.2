const router = require("express").Router();
const cartController = require("../controller/cart/cartController");

router.post("/addtocart", cartController.addToCart);
router.get("/getcart/:userId", cartController.getCart);
router.delete("/deletecart", cartController.deleteCart);
router.put("/increasequantity", cartController.increaseQuantity);
router.put("/decreasequantity", cartController.decreaseQuantity);


module.exports = router;