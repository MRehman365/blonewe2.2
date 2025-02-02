const checkoutModal = require("../../modals/checkoutModal");

// Create a new checkout
exports.createCheckout = async (req, res) => {
  try {
    const { userid, payment_status, shippingInfo, price, products } = req.body;

    // Validate required fields
    if (!userid || !payment_status || !shippingInfo || !price || !products) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    // Create a new checkout
    const checkout = await checkoutModal.create({
      userid,
      payment_status,
      shippingInfo,
      price,
      products,
    });

    res.status(201).json({
      success: true,
      message: "Checkout created successfully.",
      data: checkout,
    });
  } catch (error) {
    console.error("Error creating checkout:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create checkout.",
      error: error.message,
    });
  }
};

// Get all checkouts
exports.getAllCheckouts = async (req, res) => {
  try {
    const checkouts = await checkoutModal.find().populate({
        path: 'products.productId',
        model: 'Products',
      });
    res.status(200).json({
      success: true,
      message: "Checkouts fetched successfully.",
      data: checkouts,
    });
  } catch (error) {
    console.error("Error fetching checkouts:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch checkouts.",
      error: error.message,
    });
  }
};

// Get a single checkout by ID
exports.getCheckoutById = async (req, res) => {
  try {
    const { id } = req.params;
    const checkout = await checkoutModal.find({userid: id});

    if (!checkout) {
      return res.status(404).json({
        success: false,
        message: "Checkout not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Checkout fetched successfully.",
      data: checkout,
    });
  } catch (error) {
    console.error("Error fetching checkout:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch checkout.",
      error: error.message,
    });
  }
};

// Update a checkout by ID
exports.updateCheckout = async (req, res) => {
  try {
    const { id } = req.params;
    const { payment_status, delivery_status } = req.body;

    // Validate required fields
    if (!payment_status && !delivery_status) {
      return res.status(400).json({
        success: false,
        message:
          "At least one field (payment_status or delivery_status) is required.",
      });
    }

    const updatedCheckout = await checkoutModal.findByIdAndUpdate(
      id,
      { payment_status, delivery_status },
      { new: true }
    );

    if (!updatedCheckout) {
      return res.status(404).json({
        success: false,
        message: "Checkout not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Checkout updated successfully.",
      data: updatedCheckout,
    });
  } catch (error) {
    console.error("Error updating checkout:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update checkout.",
      error: error.message,
    });
  }
};

// Delete a checkout by ID
exports.deleteCheckout = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCheckout = await checkoutModal.findByIdAndDelete(id);

    if (!deletedCheckout) {
      return res.status(404).json({
        success: false,
        message: "Checkout not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Checkout deleted successfully.",
      data: deletedCheckout,
    });
  } catch (error) {
    console.error("Error deleting checkout:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete checkout.",
      error: error.message,
    });
  }
};
