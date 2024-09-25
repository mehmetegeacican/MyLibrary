
// Controller for handling image uploads
const imageController = async (req, res) => {
  try {
    // Ensure there are no errors during the upload
    if (req.errors) {
      return res.status(400).json({ message: 'Error during upload', errors: req.errors });
    }

    // Access the uploaded image file and the location
    const file = req.files.image ? req.files.image[0] : null; // Image file
    const location = req.body.location; // Location string

    // Ensure a file was uploaded
    if (!file) {
      return res.status(400).json({ message: 'No image uploaded!' });
    }

    // Check for text field (location)
    if (!location) {
      return res.status(400).json({ message: 'Location not provided!' });
    }

    // Send success response
    return res.status(200).json({
      message: 'Image uploaded successfully!',
      filePath: file.path,
      location: location, // Include location in response
    });

  } catch (err) {
    return res.status(500).json({ message: 'Server Error: ' + err.message });
  }
};

module.exports = {
  imageController
}