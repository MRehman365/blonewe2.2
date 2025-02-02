const productModal = require("../../modals/productModal");

class ProductController {
    addProduct = async (req, res) => {
        try {
          const {
            name,
            price,
            discount,
            description,
            category,
            isAvailable,
            store,
            tags,
            sku,
            points,
            image, // Array of image URLs
          } = req.body;
      
          // Create the product in the database
          const menu = await productModal.create({
            name,
            price,
            discount,
            description,
            category,
            image, // Store the array of image URLs
            isAvailable,
            store,
            tags,
            sku,
            points,
          });
      
          return res.status(201).json({
            message: "Product added successfully",
            success: true,
            menu,
          });
        } catch (error) {
          return res.status(500).json({ message: error.message });
        }
      };

  getProduct = async (req, res) => {
    try {
      const menu = await productModal.find().sort({ createdAt: -1 });
      return res
        .status(200)
        .json({ message: "Product fetched successfully", menu });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
};


  getProductById = async (req, res) => {
    try {
      const { id } = req.params;
      const menu = await productModal.findById(id);
      return res
        .status(200)
        .json({ message: "product fetched successfully", menu });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

  updateProduct = async (req, res) => {
    try {
      const { id } = req.params;
      const {
        name,
        price,
        discount,
        description,
        category,
        image,
        isAvailable,
        store,
        tags,
        sku,
        points,
      } = req.body;
      const menu = await productModal.findByIdAndUpdate(
        id,
        {
          name,
          price,
          discount,
          description,
          category,
          image,
          isAvailable,
          store,
          tags,
          sku,
          points,
        },
        { new: true }
      );
      return res
        .status(200)
        .json({ message: "Menu updated successfully", menu });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

  deleteProduct = async (req, res) => {
    try {
      const { id } = req.params;
      await productModal.findByIdAndDelete(id);
      return res
        .status(200)
        .json({ message: "Menu deleted successfully", success: true });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

  searchProducts = async (req, res) => {
    try {
      const { query } = req.query;
      if (!query) {
        return res.status(400).json({ message: "Query parameter is required" });
      }
      const products = await productModal.find({
        name: { $regex: query, $options: "i" },
      });
      return res
        .status(200)
        .json({ message: "Products fetched successfully", products });
    } catch (error) {
      console.error("Error in searchProducts controller:", error);
      return res
        .status(500)
        .json({ message: error.message || "Internal server error" });
    }
  };

  filterproducts = async(req, res) => {
    try {
      let { categories, sortBy } = req.query;
  
      let categoryFilter = {};
      if (categories) {
        categoryFilter.category = { $in: categories.split(",") };
      }
  
      let sortOption = {};
      if (sortBy === "lowtohigh") {
        sortOption.price = 1;
      } else if (sortBy === "hightolow") {
        sortOption.price = -1;
      }
  
      const products = await productModal.find(categoryFilter).sort(sortOption);
      res.json(products);
  
    } catch (error) {
      res.status(500).json({ message: "Server Error", error });
    }
  }


}

module.exports = new ProductController();
