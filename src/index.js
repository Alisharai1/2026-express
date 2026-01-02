const express = require('express')
const productRouter = require('./router/product.router')
const userRouter = require('./router/user.router')
const app = express()
const port = 3000

app.use(express.json())

app.use((req, res, next) => {
    console.log({ body: req.body, params: req.params, query: req.query, url: req.url, method: req.method });
    next()
})

app.use('/products', productRouter)

app.use('/users', userRouter)

app.use((error, req, res, next) => {
    console.log(error);
    res.status(500).json({ message: "internal server error" })
})

app.listen(port, () => {
    console.log("server is up!!!");

})
