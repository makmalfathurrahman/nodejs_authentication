import jwt from "jsonwebtoken";

export const loginAuthentication = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ message: "Token Needed" });
  }

  try {
    const token = authorization.split(" ")[1];
    const secretKey = process.env.SECRET_KEY;
    const jwtDecode = jwt.verify(token, secretKey);

    req.user = jwtDecode;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized", data: error.message });
  }
};
