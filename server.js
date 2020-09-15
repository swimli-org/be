const express = require('express');
const cors = require("cors");
const userRouter = require('./user/userRoutes');
const productsRouter = require('./products/productRoutes')
const cartItemsRouter = require('./cartItems/cartItemsRoutes');
const server = express();
server.use(cors());
server.use(express.json());
server.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE")
    next();
  });
server.use('/users', userRouter);
server.use('/products', productsRouter)
server.use('/cart', cartItemsRouter)
server.get('/', (req, res) => {
    res.status(200).send("API RUNNING")
});
server.post('/', (req, res) => {

});
module.exports = server;