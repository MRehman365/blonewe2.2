const productModal = require("../../modals/productModal");

class ProductController {

 addProduct = async (req, res) => {
    try {
        const { name, price, discount, description, category, image, isAvailable, store, tags, sku, points  } = req.body;
        const menu = await productModal.create({ name, price, discount, description, category, image, isAvailable, store, tags, sku, points });
        return res.status(201).json({ message: "Menu added successfully", menu });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
 }

 getProduct = async(req, res) => {
    try {
        const menu = await productModal.find();
        return res.status(200).json({ message: "Menu fetched successfully", menu });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
 }

 getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const menu = await productModal.findById(id);
        return res.status(200).json({ message: "Menu fetched successfully", menu });
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
        return res.status(200).json({ message: "Menu deleted successfully" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
 }

}

module.exports = new ProductController();
