const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const fs = require("fs").promises;
const path = require("path");
require("dotenv").config();

const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const franchiseRoutes = require("./routes/franchiseRoutes");
const menuRoutes = require("./routes/menuRoutes");

const app = express();

// Create upload/menu folder if it doesn't exist
const setupUploadFolder = async () => {
  const uploadPath = path.join(__dirname, "upload", "menu");
  try {
    await fs.mkdir(uploadPath, { recursive: true });
    console.log("Upload folder created or already exists:", uploadPath);
  } catch (err) {
    console.error("Failed to create upload folder:", err.message);
  }
};

// Call the function to create the folder
setupUploadFolder();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(morgan("dev"));

// Serve static files (for accessing uploaded images)
app.use("/upload", express.static(path.join(__dirname, "upload")));

// CORS setup
const allowedOrigins = [process.env.CLIENT_URL, process.env.FRONTEND_URL];
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// Routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/franchises", franchiseRoutes);
app.use("/api/menus", menuRoutes);

// Connect to DB
connectDB();

// Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));