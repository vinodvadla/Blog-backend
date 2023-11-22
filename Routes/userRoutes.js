const express = require("express");
const { loginUser, signupUser } = require("../Controllers/UserControlls");
let router = express.Router();

router.post("/signup", signupUser);
router.post("/login", loginUser);

module.exports=router
