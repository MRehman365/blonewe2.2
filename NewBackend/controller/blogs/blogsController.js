const blogModal = require("../../modals/blogModal");

class blogsController {
  add_blog = async (req, res) => {
    try {
      const { title, content, store, category, images } = req.body;
      const blog = await blogModal.create({
        title,
        content,
        store,
        category,
        images,
      });
      return res.status(201).json({ message: "Blog added successfully", success: true, blog });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

  get_blog = async (req, res) => {
    try {
      const blog = await blogModal.find();
      return res.status(200).json({ message: "Blog fetched successfully", blog });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

  delete_blog = async (req, res) => {
    try {
      const { id } = req.params;
      const blog = await blogModal.findByIdAndDelete(id);
      return res.status(200).json({ message: "Blog deleted successfully", success: true, blog });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new blogsController();
