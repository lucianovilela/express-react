const jwt = require("jsonwebtoken");

const secret = "my-secret-key";

const generateToken = (req, res, next) => {
  const payload = {
    username: req.query.username,
    // outras informações do usuário
  };
  const token = jwt.sign(payload, secret, { expiresIn: "1h" });
  req.token = token;
  next();
};

const validateToken = (req, res, next) => {
  const token =
    req.headers["authorization"] || req.query.token || req.session.token;
  if (!token) {
    return res.status(401).json({ error: "Token não fornecido" });
  }
  try {
    const decoded = jwt.verify(token, secret);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Token inválido" });
  }
};

module.exports = { generateToken, validateToken };
