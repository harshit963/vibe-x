import User from "../models/users.models.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.findOne({ email });

    if (user) {
      return res
        .status(409)
        .json({
          message: " User already exists , you can login",
          success: false,
        });
    }
    const userModel = new User({ name, email, password });
    userModel.password = await bcrypt.hash(password, 10);
    await userModel.save();
    res.status(201).json({ message: "signup successful", success: true });
  } catch (err) {
    res.status(500).json({ message: "Internal Server error", success: false });
  }
};
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    const errorMsg = "Auth failed email or password is wrong ";

    if (!user) {
      return res.status(409).json({ message: errorMsg, success: false });
    }

    const isPassEqual = await bcrypt.compare(password, user.password);
    if (!isPassEqual) {
      return res.status(403).json({ message: errorMsg, success: false });
    }

   // Ensure the JWT_SECRET is defined
   if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in the environment variables.");
  }

  const jwtToken = jwt.sign(
    { email: user.email, _id: user._id },
    process.env.JWT_SECRET,
    { expiresIn: "24h" }
  );

  res.status(200).json({
    message: "Login Success",
    success: true,
    jwtToken,
    email,
    name: user.name,
  });
} catch (err) {
  console.error("Login error:", err); // Log the error
  res.status(500).json({ message: "Internal Server error", success: false });
}
};
export { signup, login };
