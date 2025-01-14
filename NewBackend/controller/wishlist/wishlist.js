const wishlistModal = require("../../modals/wishlistModal");


class WishlistController {
    addToWishlist = async (req, res) => {
        try {
            const { userId, productId, quantity } = req.body;
            const product = await wishlistModal.findOne({
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
                const cart = await wishlistModal.create({ userId, productId, quantity });
                return res.status(200).json({ message: "product added successfully", cart });
            }
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
    deleteWishlist = async (req, res) => {
        try {
            const { id } = req.body;
            const cart = await wishlistModal.findByIdAndDelete(id);
            return res.status(200).json({ message: "product deleted successfully", cart });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    getWishlist = async (req, res) => {
        try {
            const { userId } = req.params;
            if (!userId) {
                return res.status(400).json({ message: "User ID is required" });
            }
            
            const cart = await wishlistModal.find({ userId });
            if (!cart || cart.length === 0) {
                return res.status(404).json({ message: "product not found" });
            }
            
            return res.status(200).json({ message: "products retrieved successfully", cart });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

}

module.exports = new WishlistController();
