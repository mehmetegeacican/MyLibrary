const {uploadImage} = require('../service/imageService');

// Controller for handling image uploads
const uploadImageRouter = async (req, res) => {
  try {
    console.log(req.body);
    const uploadResult = await uploadImage(req, res);
    if (uploadResult.success) {
      return res.status(200).json({
        message: 'Image uploaded successfully!',
        filePath: uploadResult.filePath,
      });
    } else {
      return res.status(400).json({
        message: uploadResult.message,
      });
    }
  } catch (err) {
    return res.status(500).json({ message: 'Server Error: ' + err.message });
  }
};

module.exports = {
    uploadImageRouter
}