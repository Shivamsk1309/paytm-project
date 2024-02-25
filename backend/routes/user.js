const express = require("express");
const z = require("zod");
const User = require("../db");

const router = express.Router();

const UserSchema = z.object({
  username: z.string().email(),
  firstName: z.string().min(3).max(50),
  lastName: z.string().min(3).max(50),
  password: z.string().min(6),
});

router.get("/signup", async (req, res) => {
  try {
    const { firstName, lastName, username, password } = UserSchema.parse(
      req.body
    );

    await User.create({ firstName, lastName, username, password });
  } catch (err) {
    res.status(400).json({ error: err.message });
    console.log(err);
  }
});

module.exports = router;
