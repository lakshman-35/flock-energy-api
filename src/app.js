require("dotenv").config();

const express = require("express");
const cors = require("cors");
const swaggerUI = require("swagger-ui-express");
const swaggerSpec = require("./swagger");

const meterRoutes = require("./routes/meterRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/meters", meterRoutes);

// Swagger
app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

// Home Route
app.get("/", (req, res) => {
    res.send("Flock Energy Assignment API");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});