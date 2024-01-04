const { Op } = require("sequelize");
const { User } = require("../models");
const BcryptUtil = require("../utils/BcryptUtil");
const JwtUtil = require("../utils/JwtUtil");

class AuthController {
    static async register(req, res, next) {
        try {
            await User.create(req.body);

            res.status(200).json({ status: true, message: "User Created Successfully" });
        } catch (error) {
            next(error)
        }
    }

    static async login(req, res, next) {
        const { emailOrUsername, password } = req.body
        try {
            const foundUser = await User.findOne({
                where: {
                    [Op.or]: [{ email: emailOrUsername }, { username: emailOrUsername }],
                }
            })

            if (!foundUser) {
                throw { name: "InvalidCredentials" }
            }

            const isMatchPassword = BcryptUtil.comparePassword(password, foundUser.password)
            if (!isMatchPassword) {
                throw { name: "InvalidCredentials" }
            }

            const token = JwtUtil.signToken(foundUser.id)

            res.status(200).json({
                success: true,
                accessToken: token,
                dataUser: { id: foundUser.id },
            });
        } catch (error) {
            next(error)
        }
    }
}

module.exports = AuthController