class ErrHandlerMiddleware {
    static handleError(err, req, res, next) {
        let messages
        console.log(err);
        switch (err.name) {
            case 'InvalidCredentials':
                res.status(401).json({ success: false, message: 'Incorrect username/email or password' })
                break
            case 'Unauthenticated':
                res.status(401).json({ success: false, message: "Unauthenticated User" });
                break
            case 'InvalidQuantity':
                res.status(400).json({ success: false, message: "Quantity should be greater than 0 to place an order" });
                break
            case 'insufficientQuantity':
                res.status(400).json({ status: false, message: "Insufficient quantity of Product" });
                break
            case 'Unauthorized':
                res.status(401).json({ success: false, message: "Unauthorized User" });
                break
            case 'ErrorNotFound':
                res.status(404).json({ success: false, message: "Error Not Found" });
                break
            case 'SequelizeValidationError':
                messages = err.errors.map((currentError) => currentError.message);
                res.status(404).json({ success: false, message: messages });
                break
            case 'TokenExpiredError':
                res.status(401).json({ success: false, message: err.message });
                break
            case 'JsonWebTokenError':
                res.status(401).json({ success: false, message: err.message });
                break
            case 'SequelizeUniqueConstraintError':
                messages = err.errors.map((currentError) => currentError.message);
                res.status(409).json({ success: false, message: messages });
                break
            default:
                res.status(500).json({ success: false, error: 'Something went wrong' })
                break
        }
    }
}

module.exports = ErrHandlerMiddleware