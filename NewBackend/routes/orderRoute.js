const router = require("express").Router();
const OrderController = require("../controller/order/orderController");
const { isAuthenticatedUser } = require("../middleware/validation");

router.post("/addorder", isAuthenticatedUser, OrderController.addOrder);
router.get("/getallorder", isAuthenticatedUser, OrderController.getAllOrder);
router.delete("/deleteorder/:id", isAuthenticatedUser, OrderController.deleteOrder);
router.put("/updateorder/:id", isAuthenticatedUser, OrderController.updateOrder);
router.get("/getorder/:id", isAuthenticatedUser, OrderController.getOrderById);
router.post("/userorder", isAuthenticatedUser, OrderController.userOrder);

module.exports = router;