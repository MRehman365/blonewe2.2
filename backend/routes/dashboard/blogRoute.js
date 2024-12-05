const router = require("express").Router();
const { authMiddleware } = require("../../middlewares/authMiddleware");

const blogController = require("../../controllers/dashboard/blogController");

router.post("/blog-add", blogController.add_blog);
router.get("/blog-gets", blogController.get_blog);
router.get("/single-blog:slug", blogController.single_blog);
router.delete("/blog/:id", authMiddleware, blogController.delete_blog);

module.exports = router;
