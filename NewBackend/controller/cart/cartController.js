const cartModal = require("../../modals/cartModal");

class cartController {
    addToCart = async (req, res) => {
        try {
            const { userId, menuId, quantity } = req.body;
            const menu = await cartModal.findOne({
                $and: [
                    {
                      menuId: {
                        $eq: menuId,
                      },
                    },
                    {
                      userId: {
                        $eq: userId,
                      },
                    },
                  ],
            });
            if (menu) {
                return res.status(400).json({ message: "Menu already in cart" });
            }
            else {
                const cart = await cartModal.create({ userId, menuId, quantity });
                return res.status(200).json({ message: "Cart added successfully", cart });
            }
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
    deleteCart = async (req, res) => {
        try {
            const { id } = req.body;
            const cart = await cartModal.findByIdAndDelete(id);
            return res.status(200).json({ message: "Cart deleted successfully", cart });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    getCart = async (req, res) => {
        try {
            const { userId } = req.body;
            if (!userId) {
                return res.status(400).json({ message: "User ID is required" });
            }
            
            const cart = await cartModal.find({ userId });
            if (!cart || cart.length === 0) {
                return res.status(404).json({ message: "Cart not found" });
            }
            
            return res.status(200).json({ message: "Cart retrieved successfully", cart });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    increaseQuantity = async (req, res) => {
        try {
            const { id } = req.body;
            const cart = await cartModal.findByIdAndUpdate(id, { $inc: { quantity: 1 } });
            return res.status(200).json({ message: "Cart quantity increased successfully", cart });

        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    decreaseQuantity = async (req, res) => {
        try {
            const { id } = req.body;
            const cart = await cartModal.findByIdAndUpdate(id, { $inc: { quantity: -1 } });
            return res.status(200).json({ message: "Cart quantity decreased successfully", cart });

        } catch (error) {
            
        }
    }
}

module.exports = new cartController();