const router = require("express").Router();
const TableController = require("../controller/table/tableController");

router.post("/addtable", TableController.addTable);
router.get("/getalltable", TableController.getAllTable);
router.delete("/deletetable/:id", TableController.deleteTable);
router.put("/updatetable/:id", TableController.updateTable);
router.get("/gettable/:id", TableController.getTableById);

module.exports = router;