const tableModal = require("../../modals/tableModal");

class TableController {
    addTable = async (req, res) => {
        try {
            const { tableNumber, price, status } = req.body;
            const table = await tableModal.create({ tableNumber, price, status });
            return res.status(201).json({message: "table added successfully", table})
        } catch (error) {
            return res.status(500).json({message: error.message})
        }
    }   

    getAllTable = async (req, res) => {
        try {
            const table = await tableModal.find();
            return res.status(200).json({message: "table get successfully", table})
        } catch (error) {
            return res.status(500).json({message: error.message})
        }
    }

    deleteTable = async (req, res) => {
        try {
            const { id } = req.params;
            const table = await tableModal.findByIdAndDelete(id);
            return res.status(200).json({message: "table deleted successfully", table})
        } catch (error) {
            return res.status(500).json({message: error.message})
        }
    }

    updateTable = async (req, res) => {
        try {
            const { id } = req.params;
            const { tableNumber, price, status } = req.body;
            const table = await tableModal.findByIdAndUpdate(id, { tableNumber, price, status });
            return res.status(200).json({message: "table updated successfully", table})
        } catch (error) {
            return res.status(500).json({message: error.message})
        }
        }

    getTableById = async (req, res) => {
        try {
            const { id } = req.params;
            const table = await tableModal.findById(id);
            return res.status(200).json({message: "table get successfully", table})
        } catch (error) {
            return res.status(500).json({message: error.message})
        }
    }

}

module.exports = new TableController();
