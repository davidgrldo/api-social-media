import jwt from "jsonwebtoken";

const secretKey = "1q@w3e4r5t6y";

const generateToken = (data) => {
  return jwt.sign(data, secretKey, {
    expiresIn: "12h",
  });
};

const verify = (req, res, next) => {
  try {
    const token = req.headers.authorization || "";
    let jwtPayload;

    try {
      jwtPayload = jwt.verify(token, secretKey);
      req.user = jwtPayload;
      next();
    } catch (error) {
      res.status(400).send({ message: "Not Authorized" });
    }

    const newToken = jwt.sign(jwtPayload, secretKey, {
      expiresIn: "12h",
    });

    res.setHeader("token", newToken);
    next();
  } catch (error) {
    return error;
  }
};

export { generateToken, verify };
