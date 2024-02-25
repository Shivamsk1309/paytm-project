const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../config");

const userAuthMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res.status(403).json({ message: "No token provided" });
  }
  const token = authHeader.split(" ")[1];

  try {
    const decodes = jwt.verify(token, JWT_SECRET);
    if (!decodes) {
      return res.status(403).json({ message: "Invalid token" });
    }
    req.userId = decodes.userId;
    next();
  } catch (err) {
    return res.status(403).json({ error: err.message });
  }
};

module.exports = { userAuthMiddleware };
