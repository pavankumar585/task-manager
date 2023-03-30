const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  const authorization = req.headers["authorization"];
  const token = authorization && authorization.split(" ")[1];

  if (!token) return res.status(401).send("Access denied. No token provided");

  try {
    const decoded = jwt.verify(token, process.env.PRIVATE_KEY);
    req.user = decoded;

    next();
  } catch (error) {
    res.status(400).send("Invalid token");
  }
}

module.exports = auth;
