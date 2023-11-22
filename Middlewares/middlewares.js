const express = require("express");
const cors = require("cors");
let userRouter = require("../Routes/userRoutes");
const dbconnect = require("../DB/dbConnect");
const blogRouter = require('../Routes/BlogRoutes');
require("dotenv").config();
const auth = require('./authentication');
let app = express();


dbconnect();
app.use(cors());
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/user", userRouter);
app.use('/blog', auth, blogRouter);

module.exports = app;
