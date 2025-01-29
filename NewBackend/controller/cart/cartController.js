const cartModal = require("../../modals/cartModal");

class cartController {
    addToCart = async (req, res) => {
        try {
            const { userId, productId, quantity } = req.body;
            const product = await cartModal.findOne({
                $and: [
                    {
                      productId: {
                        $eq: productId,
                      },
                    },
                    {
                      userId: {
                        $eq: userId,
                      },
                    },
                  ],
            });
            if (product) {
                return res.status(400).json({ message: "product already in cart" });
            }
            else {
                const cart = await cartModal.create({ userId, productId, quantity });
                return res.status(200).json({ message: "Cart added successfully", success:true, cart });
            }
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
    deleteCart = async (req, res) => {
        try {
            const { id } = req.params;
            const cart = await cartModal.findByIdAndDelete(id);
            return res.status(200).json({ message: "Cart deleted successfully", success: true, cart });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    getCart = async (req, res) => {
        try {
            const { userId } = req.params;
            if (!userId) {
                return res.status(400).json({ message: "User ID is required" });
            }
            
            const cart = await cartModal.find({ userId }).populate('productId');
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
            const { id } = req.params;
            const cart = await cartModal.findByIdAndUpdate(id, { $inc: { quantity: 1 } });
            return res.status(200).json({ message: "Cart quantity increased successfully", cart });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    decreaseQuantity = async (req, res) => {
        try {
            const { id } = req.params;
            const cart = await cartModal.findByIdAndUpdate(id, { $inc: { quantity: -1 } });
            return res.status(200).json({ message: "Cart quantity decreased successfully", cart });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new cartController();