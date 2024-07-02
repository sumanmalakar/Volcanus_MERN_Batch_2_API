import { User } from "../Models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  let user = await User.findOne({ email });

  if (user)
    return res.json({ message: "User Already Registered...", success: false });

  let hashPassword = await bcrypt.hash(password, 10);

  user = await User.create({ name, email, password: hashPassword });
  res.json({ message: "user register successfully...!", success: true, user });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  let user = await User.findOne({ email });

  if (!user) return res.json({ message: "User not exist ...", success: false });

  let validPass = await bcrypt.compare(password, user.password);
 
  if (!validPass) 
    return res.json({ message: "Invalid Credential", success: false });

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SC, {
    expiresIn: "365d",
  });

  res.json({ message: `Welcome ${user.name}`, success: true, token });
};
