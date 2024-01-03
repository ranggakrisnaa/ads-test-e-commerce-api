class ErrHandlerMiddleware {
    static handleError(err, req, res, next) {
        console.log(err);
        switch (err.name) {
            case 'SequelizeValidationError':
                let messages = err.errors.map((currentError) => currentError.message);
                res.status(404).json({ status: false, message: messages });
                break
            case 'ValidationError':
                res.status(400).json({ error: 'Validation error occurred' })
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