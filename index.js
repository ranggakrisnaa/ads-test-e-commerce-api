require('dotenv').config()
const express = require('express')
const ErrHandlerMiddleware = require('./middlewares/ErrHandlerMiddleware')
const router = require('./routes')
const app = express()
const port = process.env.PORT

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api/v1', router)


app.use(ErrHandlerMiddleware.handleError);

app.listen(port, () => {
    console.log(`app listening on port ${port}`);
})

module.exports = app