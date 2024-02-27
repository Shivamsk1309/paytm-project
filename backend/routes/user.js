const express = require("express");
const z = require("zod");
const { User } = require("../db");
const JWT_SECRET = require("../config");
const jwt = require("jsonwebtoken");
const { userAuthMiddleware } = require("../middlewares/user");

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

    const findUser = await User.findOne({
      username,
    });
    if (!findUser) {
      return res.status(411).json({
        message: "User not found",
      });
    }
    const validationPassed = await findUser.validatePassword(
      password,
      findUser.password_hash
    );
    if (!validationPassed) {
      return res.status(411).json({
        message: "Incorrect password",
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
      return res.status(411).json({ message: "Incorrect inputs" });
    }
    const { username, firstName, lastName, password } = result.data;

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(411).json({ message: "Email already taken" });
    }

    const newUser = new User({
      firstName,
      lastName,
      username,
    });

    const hashedPassword = await newUser.createHash(password);
    newUser.password_hash = hashedPassword;

    await newUser.save();

    const userId = { userId: newUser._id };

    const token = jwt.sign(userId, JWT_SECRET);

    return res
      .status(201)
      .json({ message: "User created successfully", token: token });
  } catch (err) {
    return res.status(411).json({ error: err.message });
  }
});

const updateSchema = z.object({
  firstName: z.string().min(3).max(50).optional(),
  lastName: z.string().min(3).max(50).optional(),
  password: z.string().min(6).optional(),
});

// update user Route
router.put("/", userAuthMiddleware, async (req, res) => {
  try {
    const result = updateSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(411).json({
        message: "Error while updating information",
      });
    }

    const updatedUser = await User.updateOne({ _id: req.userId }, result.data);

    if (!updatedUser) {
      return res.status(411).json({
        message: "Error while updating information",
      });
    }
    return res.status(200).json({ message: "User updated successfully" });
  } catch (err) {
    return res.status(411).json({ error: err.message });
  }
});

// get Users Route
router.get("/bulk", userAuthMiddleware, async (req, res) => {
  try {
    const name = req.query.filter || "";
    const users = await User.find({
      $or: [
        { firstName: { $regex: name, $options: "i" } },
        { lastName: { $regex: name, $options: "i" } },
      ],
    });
    return res.json({
      user: users.map((user) => {
        return {
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName,
          _id: user._id,
        };
      }),
    });
  } catch (err) {
    return res.status(411).json({ error: err.message });
  }
});

module.exports = router;
