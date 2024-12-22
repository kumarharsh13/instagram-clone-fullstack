const multer = require('multer');
const path = require('path');

// Set up storage configuration for multer
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		// Specify the directory where files will be stored
		cb(null, 'post_image/');
	},
	filename: function (req, file, cb) {
		// Set the filename to the user's id and the original file extension
		cb(null, Date.now() + path.extname(file.originalname));
	},
});

// Filter only image files (optional)
const fileFilter = (req, file, cb) => {
	const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
	if (!allowedTypes.includes(file.mimetype)) {
		return cb(new Error('Invalid file type. Only JPEG, PNG, and JPG are allowed.'));
	}
	cb(null, true);
};

// Create multer upload instance
const upload = multer({
	storage: storage,
	fileFilter: fileFilter,
	limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
});

module.exports = upload;
