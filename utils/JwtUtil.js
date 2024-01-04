const jwt = require('jsonwebtoken');

class JwtUtil {
    static privateKey = process.env.JWT_KEY

    static signToken(userId) {
        return jwt.sign({ userId }, JwtUtil.privateKey, { expiresIn: "1d" });
    }

    static verifyToken(token) {
        try {
            const decoded = jwt.verify(token, JwtUtil.privateKey);
            return decoded
        } catch (err) {
            throw err
        }
    }
}

module.exports = JwtUtil