const { User } = require("../models");
const BcryptUtil = require("../utils/BcryptUtil");

class UserController {
    static async getAllUser(req, res, next) {
        try {
            const foundUser = await User.findAll({
                attributes: { exclude: ["password"] },
            })

            res.status(200).json({ success: true, message: "User Data Retrieved Successfully", data: foundUser });
        } catch (error) {
            next(error)
        }
    }

    static async getUserLogin(req, res, next) {
        const { id } = req.loggedUser
        try {
            const foundUser = await User.findOne({
                where: {
                    id: id
                },
                attributes: { exclude: ["password"] },
            })

            res.status(200).json({ success: true, message: "User Data Retrieved Successfully", data: foundUser });
        } catch (error) {
            next(error)
        }
    }

    static async updateUser(req, res, next) {
        const { id } = req.loggedUser
        const { name, username, email, oldPassword, newPassword } = req.body
        try {
            const foundUser = await User.findOne({ where: { id } });

            let payload = {
                name: name || foundUser.name,
                username: username || foundUser.username,
                email: email || foundUser.email
            }

            if (oldPassword) {
                const isMatchPassword = BcryptUtil.comparePassword(oldPassword, foundUser.password)
                if (isMatchPassword) {
                    payload = {
                        ...payload,
                        password: newPassword
                    }
                } else {
                    throw { name: "InvalidCredentials" };
                }
            }

            await foundUser.update(payload);
            res
                .status(200)
                .json({ sucess: true, message: "User Updated Successfully" });
        } catch (error) {
            next(error)
        }
    }

    static async deleteUser(req, res, next) {
        const { id } = req.params
        try {
            const foundUser = await User.findOne({
                where: {
                    id
                }
            })

            if (!foundUser) {
                throw { name: "ErrorNotFound" }
            }

            await foundUser.destroy()
            res.status(200).json({ success: true, message: "User Deleted Successfully" })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = UserController