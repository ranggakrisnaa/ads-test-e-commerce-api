const jwt = require('jsonwebtoken');

class JwtUtil {
    static privateKey = process.env.JWT_KEY

    static signToken(userId) {
        return jwt.sign({ userId }, JwtUtil.privateKey, { expiresIn: "1d" });
    }
}

module.exports = JwtUtil