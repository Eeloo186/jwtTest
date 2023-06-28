const jwt = require("jsonwebtoken");

module.exports = (value) => {
  return jwt.sign(
    {
      id: value,
    },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: "5m",
    }
  );
};
