const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const multer = require("multer"); // Import multer for file uploads
const path = require("path");

dotenv.config(); // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI; // Make sure this matches your .env file

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(cors());

// Serving static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Save files to the 'uploads' folder
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Append a timestamp to the original filename
    }
});

const upload = multer({ 
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // Limit file size to 10MB
    fileFilter: function (req, file, cb) {
        const filetypes = /docx|pdf/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);

        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb(new Error('Only .docx and .pdf files are allowed!'));
        }
    }
});

// Connect to MongoDB
mongoose
    .connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log("NOT CONNECTED TO NETWORK", err));

// File upload route
app.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }
    res.status(200).send({ filePath: req.file.path, message: 'File uploaded successfully!' });
});

// Import and set up routes
const Routes = require("./routes/route.js");
const AdminRoutes = require("./routes/adminRoutes.js");

app.use('/api', Routes); // Prefix all routes with /api or adjust as needed
app.use('/api/admin', AdminRoutes); // Prefix admin routes with /api/admin

// Error handling middleware (optional but recommended)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).send(err.message || 'Something went wrong!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
});
