const coupenModal = require("../../modals/coupenModal");

exports.addcoupen = async (req, res) => {
    try {
        const { code, discount, limit } = req.body;
        const coupon = await coupenModal.create({ code, discount, limit });
        return res.status(201).json({ message: "Coupon created successfully", success: true, coupon });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

exports.getcoupen = async (req, res) => {
    try {
        const coupons = await coupenModal.find();
        return res.status(200).json({ message: "Coupons fetched successfully", coupons });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

exports.getCouponByCode = async (req, res) => {
    try {
        const { code } = req.params;
        const coupon = await coupenModal.findOne({ code });
        if (!coupon) return res.status(404).json({ message: "Coupon not found" });
        return res.status(200).json({ message: "Coupon fetched successfully", coupon });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

exports.deleteCoupen = async (req, res) => {
    try {
        const { id } = req.params;
        const coupon = await coupenModal.findByIdAndDelete( id );
        if (!coupon) return res.status(404).json({ message: "Coupon not found" });
        return res.status(200).json({ message: "Coupon deleted successfully", success: true, coupon });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
}