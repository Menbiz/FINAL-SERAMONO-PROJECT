const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
// const bodyParser = require("body-parser");

const app = express();
const Routes = require("./routes/route.js");

dotenv.config(); // Load environment variables from .env file

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI; // Make sure this matches your .env file

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(cors());
// app.use(bodyParser.json({ limit: '10mb', extended: true }));
// app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

// Connect to MongoDB
mongoose
    .connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log("NOT CONNECTED TO NETWORK", err));

// Set up routes
app.use('/', Routes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server started at port no. ${PORT}`);
});
