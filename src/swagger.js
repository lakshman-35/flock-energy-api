const swaggerJsdoc = require("swagger-jsdoc");

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Flock Energy Assignment API",
            version: "1.0.0",
            description: "REST API Wrapper for Urja Meter Operations Portal"
        },
        servers: [
            {
                url: process.env.BASE_API_URL || "http://localhost:3000"
            }
        ]
    },
    apis: ["./src/routes/*.js"]
};

module.exports = swaggerJsdoc(options);