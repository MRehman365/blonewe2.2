const productModal = require("../../modals/productModal");

class ProductController {

 addProduct = async (req, res) => {
    try {
        const { name, price, discount, description, category, image, isAvailable, store, tags, sku, points  } = req.body;
        const menu = await productModal.create({ name, price, discount, description, category, image, isAvailable, store, tags, sku, points });
        return res.status(201).json({ message: "Product added successfully", success: true, menu });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
 }

 getProduct = async(req, res) => {
    try {
        const menu = await productModal.find();
        return res.status(200).json({ message: "Product fetched successfully", menu });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
 }

 getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const menu = await productModal.findById(id);
        return res.status(200).json({ message: "product fetched successfully", menu });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
 }

 updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, price, discount, description, category, image, isAvailable,  store, tags, sku, points } = req.body;
        const menu = await productModal.findByIdAndUpdate(id, { name, price, discount, description, category, image, isAvailable,  store, tags, sku, points }, { new: true });
        return res.status(200).json({ message: "Menu updated successfully", menu });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
 }

 deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        await productModal.findByIdAndDelete(id);
        return res.status(200).json({ message: "Menu deleted successfully", success: true });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
 }

 getSortedAndFilteredProducts = async (req, res) => {
    try {
        const { category, sortBy, minPrice, maxPrice } = req.query;
        let query = {};

        // Filter by category
        if (category) {
            query.category = category;
        }

        // Filter by price range
        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice) {
                query.price.$gte = parseFloat(minPrice); // Greater than or equal to minPrice
            }
            if (maxPrice) {
                query.price.$lte = parseFloat(maxPrice); // Less than or equal to maxPrice
            }
        }

        // Sorting logic
        let sortQuery = {};
        if (sortBy === 'price_asc') {
            sortQuery.price = 1; // Sort by price in ascending order
        } else if (sortBy === 'price_desc') {
            sortQuery.price = -1; // Sort by price in descending order
        }

        // Fetch products with filters and sorting
        const products = await productModal.find(query).sort(sortQuery);
        return res.status(200).json({ message: "Products fetched successfully", products });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

}

module.exports = new ProductController();
