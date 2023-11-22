let User = require("../Models/UserModel");
const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  let { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json("auth token required");
  }

  try {
    let token = authorization.split(" ")[1];
    let { id } = await jwt.verify(token, process.env.SECRET);
    let user = await User.findOne({ _id: id });
    req.user = user._id;
    next();
  } catch (error) {
    res.status(401).json("You are not authorized");
  }
};



module.exports=auth
