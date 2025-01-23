const router = require("express").Router();
const categoryController = require("../controller/category/categoryController");

router.post("/addcategory", categoryController.addCategory);
router.get("/getcategory", categoryController.getCategory);
router.delete("/deletecategory/:id", categoryController.deleteCategory);
router.put("/updatecategory", categoryController.updateCategory);

module.exports = router;