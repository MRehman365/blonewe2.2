const categoryModal = require("../../modals/categoryModal");

class categoryController {
    addCategory = async (req, res) => {
        try {
            const { name, image } = req.body;
            const category = await categoryModal.create({ name, image });
            return res.status(200).json({ message: "Category added successfully", success:true, category });

        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    getCategory = async (req, res) => {
        try {
            const category = await categoryModal.find();
            return res.status(200).json({ message: "Category fetched successfully", success: true, category });

        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    deleteCategory = async (req, res) => {
        try {
            const { id } = req.params;
            const category = await categoryModal.findByIdAndDelete(id);
            const updatedCategories = await categoryModal.find(); // Fetch the updated list
            return res.status(200).json({ message: "Category deleted successfully",success: true, categories: updatedCategories });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    updateCategory = async (req, res) => {
        try {
            const { id } = req.body;
            const category = await categoryModal.findByIdAndUpdate(id, req.body);
            return res.status(200).json({ message: "Category updated successfully", category });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new categoryController();