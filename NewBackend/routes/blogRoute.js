const blogsController = require("../controller/blogs/blogsController");

const router = require("express").Router();

router.post("/addblog", blogsController.add_blog)
router.get("/getblog", blogsController.get_blog)
router.get("/getblogbyid/:id", blogsController.get_blog_by_id)
router.delete("/deleteblog/:id", blogsController.delete_blog)

module.exports = router;