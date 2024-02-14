import { prismaClient } from "../src/prisma-client.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const postUserLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await prismaClient.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      res.status(404).json({ message: "ERROR: User Not Found", data: error });
    }
    if (!user.password) {
      res.status(403).json({ message: "ERROR: Wrong Password!", data: error });
    }

    const isPasswordValid = bcrypt.compare(password, user.password);
    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
      address: user.address,
    };
    const secretKey = process.env.SECRET_KEY;
    const expiresIn = 60 * 60 * 1;

    const token = jwt.sign(payload, secretKey, { expiresIn: expiresIn });

    if (isPasswordValid) {
      return res.status(200).json({
        method: "POST",
        status: 201,
        data: {
          id: user.id,
          name: user.name,
          email: user.email,
          address: user.address,
        },
        token: token,
      });
    } else {
      return res.status(403).json({ message: "ERROR: Wrong Password", data: error });
    }
  } catch (error) {
    return res.status(500).json({ message: "ERROR: Internal Server Error", data: error.message });
  }
};
