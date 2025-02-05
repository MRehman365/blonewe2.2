const productModal = require("../../modals/productModal");
const reviewModal = require("../../modals/reviewModal");

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

  filterproducts = async (req, res) => {
    try {
      let { categories, sortBy, page = 1, limit = 8 } = req.query;
      
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
  
      const products = await productModal
        .find(categoryFilter)
        .sort(sortOption)
        .skip((page - 1) * limit) // Skip products based on page number
        .limit(parseInt(limit)); // Limit the number of products per page
  
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: "Server Error", error });
    }
  };

  submit_review = async (req, res) => {
    const { name, rating, review, productId } = req.body;
    console.log(req.body);
    try {
      await reviewModal.create({
        productId,
        name,
        rating,
        review,
      });

      let rat = 0;
      const reviews = await reviewModal.find({
        productId,
      });
      for (let i = 0; i < reviews.length; i++) {
        rat = rat + reviews[i].rating;
      }
      let productRating = 0;

      if (reviews.length !== 0) {
        productRating = (rat / reviews.length).toFixed(1);
      }

      await productModal.findByIdAndUpdate(productId, {
        rating: productRating,
      });

      return res.status(201).json({
        message: "Review Success",
        success: true,
    });
    
    } catch (error) {
      console.log(error);
    }
  };

  get_reviews = async (req, res) => {
    const { productId } = req.params;
    let { pageNo } = req.query;
    pageNo = parseInt(pageNo);
    const limit = 5;
    const skipPage = limit * (pageNo - 1);
    try {
      let getRating = await reviewModal.aggregate([
        {
          $match: {
            productId: {
              $eq: productId,
            },
            rating: {
              $not: {
                $size: 0,
              },
            },
          },
        },
        {
          $unwind: "$rating",
        },
        {
          $group: {
            _id: "$rating",
            count: {
              $sum: 1,
            },
          },
        },
      ]);
      let rating_review = [
        {
          rating: 5,
          sum: 0,
        },
        {
          rating: 4,
          sum: 0,
        },
        {
          rating: 3,
          sum: 0,
        },
        {
          rating: 2,
          sum: 0,
        },
        {
          rating: 1,
          sum: 0,
        },
      ];
      for (let i = 0; i < rating_review.length; i++) {
        for (let j = 0; j < getRating.length; j++) {
          if (rating_review[i].rating === getRating[j]._id) {
            rating_review[i].sum = getRating[j].count;
            break;
          }
        }
      }
      const getAll = await reviewModal.find({
        productId,
      });
      const reviews = await reviewModal
        .find({
          productId,
        })
        .skip(skipPage)
        .limit(limit)
        .sort({
          createdAt: -1,
        });
        return res.status(200).json({
          message: "Review fetch Success",
          success: true,
          getAll
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
  


}

module.exports = new ProductController();
