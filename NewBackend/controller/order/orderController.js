const orderModal = require("../../modals/orderModal");

class OrderController {
    addOrder = async (req, res) => {
        try {
            const { userId, menu, quantity, totalPrice, status, shippingAddress, shippingCharges, orderDate } = req.body;
            const order = await orderModal.create({ userId, menu, quantity, totalPrice, status, shippingAddress, shippingCharges, orderDate });
            return res.status(201).json({ message: "Order added successfully", order });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    getAllOrder = async (req, res) => {
        try {
            const order = await orderModal.find();
            return res.status(201).json({ message: "order get successfully", order})
        } catch (error){
            return res.status(500).json({message: error.message})
        }
    }

    getOrderById = async (req, res) => {
        try {
            const { id } = req.params;
            const order = await orderModal.findById(id);
            return res.status(201).json({message: "order get successfully", order})
        } catch (error) {
            return res.status(500).json({message: error.message})
        }
    }

    userOrder = async (req, res) => {
        try {
            const { userId } = req.body;
            
            const orders = await orderModal.find({ userId: userId });
            
            if (!orders || orders.length === 0) {
                return res.status(404).json({ message: "No orders found for this user" });
            }

            return res.status(200).json({
                message: "User orders retrieved successfully",
                orders
            });
        } catch(error) {
            return res.status(500).json({ message: error.message });
        }
    }

    deleteOrder = async (req, res) => {
        try {
            const { id } = req.params;
            await orderModal.findByIdAndDelete(id);
            return res.status(201).json({message: "order deleted successfully",})
        } catch (error) {
            return res.status(500).json({message: error.message})
        }
    }

    updateOrder = async (req, res) => {
        try {
            const { id } = req.params;
            const { userId, menu, quantity, totalPrice, status, shippingAddress, shippingCharges, orderDate } = req.body;
            const order = await orderModal.findByIdAndUpdate(id, { userId, menu, quantity, totalPrice, status, shippingAddress, shippingCharges, orderDate });
            return res.status(201).json({message: "order updated successfully", order})

        } catch (error) {
            return res.status(500).json({message: error.message})
        }
    }

}

module.exports = new OrderController();
