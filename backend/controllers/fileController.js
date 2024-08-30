const path = require('path');
const multer = require('multer');
const { checkAdmin } = require('../middlewares/authMiddleware'); // Import your admin check middleware

// Setup storage for multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Ensure the 'uploads' directory exists or create it
        const uploadDir = path.join(__dirname, '../uploads');
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir); // Directory for storing files
    },
    filename: (req, file, cb) => {
        // Use a unique filename based on the current timestamp
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

// Endpoint to upload files
const uploadFile = [upload.single('file'), async (req, res) => {
    try {
        const { type, description } = req.body;
        const file = req.file;

        if (!file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        // Save file details in your database (e.g., MongoDB)
        // Example: { type, description, filePath: file.path, originalName: file.originalname }

        res.send({ message: 'File uploaded successfully', file });
    } catch (error) {
        res.status(500).json({ error: 'Error uploading file' });
    }
}];

// Endpoint to list files (admin-only)
const listFiles = [checkAdmin, async (req, res) => {
    try {
        // Retrieve files from your database
        // This is a placeholder; replace with your actual logic to retrieve files
        res.send({ files: [] }); // Replace with actual file list from your database
    } catch (error) {
        res.status(500).json({ error: 'Error retrieving files' });
    }
}];

// Endpoint to get file by ID
const getFile = [checkAdmin, async (req, res) => {
    try {
        const { fileId } = req.params;
        // Find file path in your database or logic to determine file path
        const filePath = path.join(__dirname, '../uploads', fileId);

        if (fs.existsSync(filePath)) {
            res.sendFile(filePath);
        } else {
            res.status(404).json({ error: 'File not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error retrieving file' });
    }
}];

module.exports = {
    uploadFile,
    listFiles,
    getFile
};
