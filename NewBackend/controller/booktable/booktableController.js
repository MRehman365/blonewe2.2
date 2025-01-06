const booktableModal = require("../../modals/booktableModal");

class BookTableController {
    bookTable = async (req, res) => {
        try {
            const { userId, table, bookingDate, time } = req.body;
            const bookTable = await booktableModal.create({ userId, table, bookingDate, time });
            return res.status(201).json({message: "table booked successfully", bookTable})
        } catch (error) {
            return res.status(500).json({message: error.message})
        }
    }
    getAllBookTable = async (req, res) => {
        try {
            const bookTable = await booktableModal.find();  
            return res.status(200).json({message: "table get successfully", bookTable})
        } catch (error) {
            return res.status(500).json({message: error.message})
        }
    }
    deleteBookTable = async (req, res) => {
        try {
            const { id } = req.body;
            const bookTable = await booktableModal.findByIdAndDelete(id);
            return res.status(200).json({message: "table deleted successfully", bookTable})
        } catch (error) {
            return res.status(500).json({message: error.message})
        }
    }
    getBookTableById = async (req, res) => {
        try {
            const { id } = req.params;
            const bookTable = await booktableModal.findById(id);
            return res.status(200).json({message: "table get successfully", bookTable})
        } catch (error) {
            return res.status(500).json({message: error.message})
        }
    }
    getBookTableByUserId = async (req, res) => {
        try {
            const { userId } = req.body;
            const bookTable = await booktableModal.find({ userId });
            return res.status(200).json({message: "table get successfully", bookTable})
        } catch (error) {
            return res.status(500).json({message: error.message})
        }
    }

}   

module.exports = new BookTableController();
