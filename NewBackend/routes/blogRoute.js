const blogsController = require("../controller/blogs/blogsController");

const router = require("express").Router();

router.post("/addblog", blogsController.add_blog)
router.get("/getblog", blogsController.get_blog)
router.delete("/deleteblog/:id", blogsController.delete_blog)

module.exports = router;