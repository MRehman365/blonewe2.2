const productController = require("../controller/menu/productController");


const router = require("express").Router();

router.post("/addproduct", productController.addProduct);
router.get("/allproduct", productController.getProduct);
router.get("/getproduct/:id", productController.getProductById);
router.put("/updateproduct/:id", productController.updateProduct);
router.delete("/deleteproduct/:id", productController.deleteProduct);

module.exports = router;