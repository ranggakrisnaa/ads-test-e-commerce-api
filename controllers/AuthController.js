class AuthController {
    static async register(req, res, next) {
        const { name, username, email, password } = req.body
        try {
            const foundUser = await User.findOne({
                where: {
                    [Op.or]: [{ email }, { username }],
                },
            });

            if (foundUser) {

            }
        } catch (error) {
            console.log(error);
            next(error)
        }
    }

    static async login(req, res) { }
}

module.exports = AuthController