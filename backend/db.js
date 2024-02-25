const mongoose = require("mongoose");
const z = require("zod");

const dotenv = require("dotenv");
dotenv.config();

// console.log("MONGO_URI:", process.env.MONGO_URI); // Debugging statement

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.log(`Error: ${err.message}`);
    process.exit(1);
  }
};

connectDB();

const UserSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 50,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 50,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minLength: 3,
    maxLength: 50,
    lowercase: true,
  },
});

const User = mongoose.model("User", UserSchema);
module.exports = {
  User,
};
