const router = require("express").Router();
const BookTableController = require("../controller/booktable/booktableController");

router.post("/booktable", BookTableController.bookTable);
router.get("/getallbooktable", BookTableController.getAllBookTable);
router.delete("/deletebooktable", BookTableController.deleteBookTable);
router.get("/getbooktablebyid/:id", BookTableController.getBookTableById);
router.get("/getbooktablebyuserid", BookTableController.getBookTableByUserId);

module.exports = router;