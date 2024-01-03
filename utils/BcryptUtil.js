class BcryptUtil {

    constructor() {
        this.saltRounds = 10;
    }

    static hashPassword(password) {
        return bcrypt.hashSync(password, saltRounds);
    }

    static comparePassword(password, hashedPassword) {
        return bcrypt.compareSync(password, hashedPassword);
    }
}

module.exports = BcryptUtil