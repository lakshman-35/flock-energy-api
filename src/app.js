require("dotenv").config();
const cors = require("cors");

app.use(cors());

const express = require("express");
const swaggerUI = require("swagger-ui-express");
const swaggerSpec = require("./swagger");

const meterRoutes = require("./routes/meterRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(express.json());

app.use("/api/v1/auth", authRoutes);

app.use("/api/v1/meters", meterRoutes);

app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));
app.get("/", (req, res) => {
    res.send("Flock Energy Assignment API");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});