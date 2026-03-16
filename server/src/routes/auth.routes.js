import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { registerSchema, loginSchema } from "../validators/auth.validators.js";
import { getCookieOptions } from "../utils/cookies.js";
import { requireAuth } from "../middleware/auth.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  const parsed = registerSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ message: "Invalid input", errors: parsed.error.flatten() });

  const { name, email, password } = parsed.data;

  const exists = await User.findOne({ email });
  if (exists) return res.status(409).json({ message: "Email already in use" });

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, passwordHash });

  return res.status(201).json({ id: user._id, name: user.name, email: user.email });
});

router.post("/login", async (req, res) => {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ message: "Invalid input", errors: parsed.error.flatten() });

  const { email, password } = parsed.data;

  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return res.status(401).json({ message: "Invalid credentials" });

  const token = jwt.sign(
    { email: user.email, name: user.name },
    process.env.JWT_SECRET,
    { subject: String(user._id), expiresIn: "7d" }
  );

  res.cookie("access_token", token, getCookieOptions());
  return res.json({ id: user._id, name: user.name, email: user.email });
});

router.post("/logout", (req, res) => {
  res.clearCookie("access_token", { httpOnly: true, sameSite: "lax", secure: false });
  return res.json({ message: "Logged out" });
});

router.get("/me", requireAuth, async (req, res) => {
  return res.json({ id: req.user.id, name: req.user.name, email: req.user.email });
});

export default router;