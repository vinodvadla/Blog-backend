let User = require("../Models/UserModel");
let bcrypt = require("bcrypt");
let jwt = require("jsonwebtoken");

let generateToken = (id) => {
  let token = jwt.sign({ id }, process.env.SECRET);
  return token;
};

let signupUser = async (req, res) => {
  let { email, name, password } = req.body;
  try {
    let exist = await User.findOne({ email });
    if (exist) {
      return res.status(404).json({ error: "email already in use" });
    }

    let hash = await bcrypt.hash(password, 10);
    let user = new User({
      name,
      email,
      password: hash,
    });
    await user.save();
    res.status(200).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

let loginUser = async (req, res) => {
  let { email, password } = req.body;
  try {
    let exist = await User.findOne({ email });
    if (!exist) {
      return res.status(404).json({ error: "User not registered" });
    }
    let compare = await bcrypt.compare(password, exist.password);
    if (!compare) {
      return res.status(404).json({ error: "Incorrect password" });
    }

    let token = await generateToken(exist._id);
    res.status(200).json({ user: exist, token});
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = { loginUser, signupUser };
