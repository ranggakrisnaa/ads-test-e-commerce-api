const { User } = require("../models");

class AuthController {
    static async register(req, res, next) {
        try {
            await User.create(req.body);

            res.status(200).json({ status: true, message: "User Created Successfully" });
        } catch (error) {
            next(error)
        }
    }

    static async login(req, res) { }
}

module.exports = AuthController