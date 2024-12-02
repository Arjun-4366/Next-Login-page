const userModel = require("../model/userSchema");
const bcrypt = require("bcrypt");
const generateToken = require("../config/token")

const securePassword = async (password) => {
  const hashedPassword = bcrypt.hash(password, 10);
  return hashedPassword;
};

const loginForm = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userData = await userModel.findOne({ email: email });

    if (!userData) {
      res.json({ message: "not a registered user" });
      res.status(400);
    } else {
      const passwordCheck = await bcrypt.compare(password, userData.password);
      await userData.save();
      if (passwordCheck) {
        res.status(201).json({
          _id: userData._id,
          name: userData.name,
          email: userData.email,
          password: userData.password,
          token: userData.token,
        });
      } else {
        res.json({ message: "Incorrect password" });
        res.status(400);
      }
    }
  } catch (error) {
    console.log(error.message);
  }
};

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const secPassword = await securePassword(password);
    const checkExistingUser = await userModel.findOne({ email: email });
    if (checkExistingUser) {
      res.status(400).json({ message: "user already exist" });
    }

    const userData = await userModel.create({
      name: name,
      email: email,
      password: secPassword,
    });
    if (userData) {
      res.status(201).json({
        _id: userData._id,
        name: userData.name,
        email: userData.email,
        token: generateToken(userData._id),
      });
      userData.token = generateToken(userData._id);
      userData.save();
    } else {
      res.status(400).json({
        message: "Registration failed",
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  loginForm,
  register,
};
