const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");
const path = require("path");

const uploadImageToImgBB = async (imageFile) => {
  try {
    const apiKey = "18e63ff899cb908d823daa101c023095"; // Replace with your ImgBB API key

    // Create a form-data object
    const formData = new FormData();
    formData.append("image", fs.createReadStream(imageFile.path));

    // Upload the image to ImgBB
    const response = await axios.post(`https://api.imgbb.com/1/upload?key=${apiKey}`, formData, {
      headers: formData.getHeaders(),
    });

    // Return the image URL
    return response.data.data.url;
  } catch (error) {
    console.error("Error uploading image to ImgBB:", error.message);
    throw new Error("Failed to upload image to ImgBB");
  }
};

module.exports = uploadImageToImgBB;