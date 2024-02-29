const express = require("express");
const router = express.Router();
const { User, Account } = require("../db");
const { mongoose } = require("mongoose");
const { userAuthMiddleware } = require("../middlewares/user");

router.post("/transfer", userAuthMiddleware, async (req, res) => {
  try {
    const session = await mongoose.startSession();
    await session.startTransaction();

    const { amount, to } = req.body;

    const account = await Account.findOne({ userId: req.userId }).session(
      session
    );

    if (!account || account.balance < amount) {
      await session.abortTransaction();
      return res.status(400).json({ message: "Insufficient balance" });
    }

    const toAccount = await Account.findOne({ userId: to }).session(session);
    if (!toAccount) {
      await session.abortTransaction();
      return res.status(400).json({ message: "User not found" });
    }

    await Account.updateOne(
      {
        userId: req.userId,
      },
      {
        $inc: { balance: -amount },
      }
    ).session(session);

    await Account.updateOne(
      {
        userId: to,
      },
      {
        $inc: { balance: amount },
      }
    ).session(session);

    await session.commitTransaction();

    return res.status(200).json({ message: "Transfer successful" });
  } catch (err) {
    return res.status(411).json({ error: err.message });
  }
});

router.get("/balance", userAuthMiddleware, async (req, res) => {
  try {
    const account = await Account.findOne({
      userId: req.userId,
    });

    res.json({
      balance: account.balance,
    });
  } catch (err) {
    return res.status(411).json({ error: err.message });
  }
});
module.exports = router;
