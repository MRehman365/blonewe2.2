const bannersModal = require("../../modals/bannersModal");

exports.addOrUpdateBanner = async (req, res) => {
    try {
        const { mainbanner, secondbanner, thirdbanner, fourthbanner, fifthbanner } = req.body;

        const banner = await bannersModal.findOneAndUpdate(
            {}, // Find the existing banner (assuming there's only one)
            { mainbanner, secondbanner, thirdbanner, fourthbanner, fifthbanner }, // Update fields
            { new: true, upsert: true } // Create if not exists, return updated doc
        );

        return res.status(200).json({
            message: "Banner added/updated successfully",
            success: true,
            banner
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


exports.getbanners = async(req, res) => {
    try {
        const banners = await bannersModal.find();
        return res.status(200).json({ message: "Banners fetched successfully", banners });
    }
    catch (error){
        return res.status(500).json({ message: error.message });
    }
}