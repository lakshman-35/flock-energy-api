require("dotenv").config();

module.exports = {
    baseURL: process.env.BASE_URL,
    email: process.env.URJA_EMAIL,
    password: process.env.URJA_PASSWORD
};