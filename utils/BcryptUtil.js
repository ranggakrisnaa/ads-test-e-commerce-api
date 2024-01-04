const bcrypt = require('bcrypt')
class BcryptUtil {
    static saltRounds = 10;

    static hashPassword(password) {
        return bcrypt.hashSync(password, BcryptUtil.saltRounds);
    }

    static comparePassword(password, hashedPassword) {
        return bcrypt.compareSync(password, hashedPassword);
    }
}

module.exports = BcryptUtil