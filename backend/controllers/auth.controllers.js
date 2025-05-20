import User from "../models/user.model.js";
import generateToken from "../utils/generateToken.js";

const signup = async (req, res, next) => {
  let { username, email, password, confirmPassword } = req.body;
  let newUser = await User.create({
    username,
    email,
    password,
    confirmPassword,
  });
  if (!newUser) {
    let err = new Error("User is not registered");
    err.statusCode = 401;
    throw err;
  }
  let token = generateToken(newUser._id);
  res.status(201).json({ status: "Success", newUser, token });
};

const login = async (req, res, next) => {
  let { email, password } = req.body;
  if (!email || !password) {
    let err = new Error("Please fill all the fields");
    err.statusCode = 400;
    throw err;
  }
  let existingUser = await User.findOne({ email });
  if (
    !existingUser ||
    !(await existingUser.verifyPassword(password, existingUser.password))
  ) {
    let err = new Error("User and Password is not correct!!");
    err.statusCode = 401;
    throw err;
  }
  let token = generateToken(existingUser._id);
  res.status(200).json({ status: "Success", existingUser, token });
};

export { signup, login };
