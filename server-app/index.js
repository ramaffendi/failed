const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoutes = require("./Routes/Route");
const listingRoutes = require("./Routes/Listing");
const cors = require("cors");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL;

app.use(
  cors({
    origin: "http://localhost:5173",
    allowedHeaders: "Content-Type,Authorization",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // URL frontend Anda
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/auth", authRoutes);
app.use("/property", listingRoutes);

mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("Terhubung ke MongoDB");
  })
  .catch((error) => {
    console.error("Gagal terhubung ke MongoDB:", error.message);
  });

app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});
