const wishlistModal = require("../../modals/wishlistModal");


class WishlistController {
    addToWishlist = async (req, res) => {
        try {
            const { userId, productId} = req.body;
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
                const wishlist = await wishlistModal.create({ userId, productId});
                return res.status(200).json({ message: "product added successfully", success: true, wishlist });
            }
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
    deleteWishlist = async (req, res) => {
        try {
            const { id } = req.params;
            const wishlist = await wishlistModal.findByIdAndDelete(id);
            return res.status(200).json({ message: "product deleted successfully", success: true, wishlist });
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
            
            const wishlist = await wishlistModal.find({ userId }).populate('productId');
            if (!wishlist || wishlist.length === 0) {
                return res.status(404).json({ message: "product not found" });
            }
            
            return res.status(200).json({ message: "products retrieved successfully", wishlist });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

}

module.exports = new WishlistController();
