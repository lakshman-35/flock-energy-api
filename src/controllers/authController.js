const urjaClient = require("../services/urjaClient");

exports.login = async (req, res) => {
    try {
        await urjaClient.login();

        res.status(200).json({
            success: true,
            message: "Successfully authenticated with Urja Portal"
        });
    } catch (error) {
        console.error("Authentication Error:", error.message);

        res.status(500).json({
            success: false,
            message: "Authentication failed",
            error: error.message
        });
    }
};