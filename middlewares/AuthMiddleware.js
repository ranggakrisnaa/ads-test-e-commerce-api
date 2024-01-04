const JwtUtil = require("../utils/JwtUtil");
const { User } = require("../models");

class AuthMiddleware {
    static async authenticate(req, res, next) {
        try {
            const authHeaders = req.headers.authorization
            if (!authHeaders) throw { name: "Unauthenticated" };

            const token = authHeaders && authHeaders.split(" ")[1]
            const payload = JwtUtil.verifyToken(token)

            const foundUser = await User.findOne({
                where: {
                    id: payload.userId
                }
            })
            if (!foundUser) throw { name: "ErrorNotFound" };

            req.loggedUser = {
                id: foundUser.id,
                name: foundUser.name,
                email: foundUser.email,
                role: foundUser.role,
            }

            next()
        } catch (error) {
            next(error)
        }
    }

    static async authorize(req, res, next) {
        if (req.loggedUser.role !== "seller") {
            throw { name: "Unauthorized" }
        }
        next()
    }
}

module.exports = AuthMiddleware