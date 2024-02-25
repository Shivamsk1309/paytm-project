const express = require("express");
const z = require("zod");
const { User } = require("../db");
const JWT_SECRET = require("../config");
const jwt = require("jsonwebtoken");

const router = express.Router();

const signInBody = z.object({
  username: z.string().email(),
  password: z.string().min(6),
});

//SignIn Route
router.post("/signin", async (req, res) => {
  try {
    const result = signInBody.safeParse(req.body);
    if (!result.success) {
      return res.status(411).json({ message: "Incorrect inputs" });
    }
    const { username, password } = result.data;
    const findUser = await User.find({
      where: {
        username,
        password,
      },
    });
    if (!findUser) {
      return res.status(411).json({
        message: "Error while logging in",
      });
    }
    const token = jwt.sign({ userId: findUser._id }, JWT_SECRET);

    return res.status(200).json({
      message: "User logged in successfully",
      token: token,
    });
  } catch (err) {
    return res.status(411).json({ error: err.message });
  }
});

const UserSchema = z.object({
  username: z.string().email(),
  firstName: z.string().min(3).max(50),
  lastName: z.string().min(3).max(50),
  password: z.string().min(6),
});

// Signup Route
router.post("/signup", async (req, res) => {
  try {
    const result = UserSchema.safeParse(req.body);
    if (!result.success) {
      return res
        .status(411)
        .json({ message: "Email already taken / Incorrect inputs" });
    }
    const { username, firstName, lastName, password } = result.data;

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res
        .status(411)
        .json({ message: "Email already taken / Incorrect inputs" });
    }

    const newUser = await User.create({
      firstName,
      lastName,
      username,
      password,
    });
    const userId = { userId: newUser._id };

    const token = jwt.sign(userId, JWT_SECRET);

    return res
      .status(201)
      .json({ message: "User created successfully", token: token });
  } catch (err) {
    return res.status(411).json({ error: err.message });
  }
});

// update user Route
router.put("/", async (req, res) => {});

module.exports = router;
