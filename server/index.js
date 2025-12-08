const express = require("express");
const cors = require("cors");
const connectDB = require("./config/database");
const app = express();
const PORT = process.env.PORT || 4000;
const fileUpload = require("express-fileupload");
const { cloudinaryConnect } = require("./config/cloudinary");
require("dotenv").config();

// Middleware
// dusre domain (frontend) se requests allow karta hai.
app.use(cors());
// request ka JSON data parse karke use req.body me available karata hai.
app.use(express.json());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

const cookieParser = require("cookie-parser");
app.use(cookieParser());
// Routes
const authRoutes = require("./routes/authRoutes");
const profileRoutes = require("./routes/profileRoutes");
const itemRoutes = require("./routes/itemRoutes");
const adminRoutes = require("./routes/admin")
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/items", itemRoutes);
app.use("/api/v1/admin",adminRoutes)


// Connect to MongoDB
connectDB();
cloudinaryConnect();
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
// This code sets up an Express server, connects to MongoDB, and listens on a specified port.
// app.get("/", (req, res) => {
//   res.send(`<h1>Welcome to the blog API</h1>`);
// });
