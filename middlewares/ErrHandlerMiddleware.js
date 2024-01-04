class ErrHandlerMiddleware {
    static handleError(err, req, res, next) {
        let messages
        console.log(err);
        switch (err.name) {
            case 'InvalidCredentials':
                res.status(401).json({ status: false, message: 'Incorrect username/email or password' })
                break
            case 'Unauthenticated':
                res.status(401).json({ status: false, message: "Unauthenticated User" });
                break
            case 'ErrorNotFound':
                res.status(404).json({ status: false, message: "Error Not Found" });
                break
            case 'SequelizeValidationError':
                messages = err.errors.map((currentError) => currentError.message);
                res.status(404).json({ status: false, message: messages });
                break
            case 'JsonWebTokenError':
                res.status(401).json({ status: false, message: err.message });
                break
            case 'SequelizeUniqueConstraintError':
                messages = err.errors.map((currentError) => currentError.message);
                res.status(409).json({ status: false, message: messages });
                break
            case 'UnauthorizedError':
                res.status(401).json({ error: 'Unauthorized access' })
                break
            default:
                res.status(500).json({ error: 'Something went wrong' })
                break
        }
    }
}

module.exports = ErrHandlerMiddleware