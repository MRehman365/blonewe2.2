const router = require("express").Router();
const OrderController = require("../controller/order/orderController");

router.post("/addorder", OrderController.addOrder);
router.get("/getallorder", OrderController.getAllOrder);
router.delete("/deleteorder/:id", OrderController.deleteOrder);
router.put("/updateorder/:id", OrderController.updateOrder);
router.get("/getorder/:id", OrderController.getOrderById);
router.post("/userorder", OrderController.userOrder);

module.exports = router;