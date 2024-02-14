import { prismaClient } from "../src/prisma-client.js";
import bcrypt from "bcrypt";

export const createUserRegister = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 8);
    const { name, email, password, address } = req.body;

    const user = await prismaClient.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        address,
      },
    });

    res.status(201).json({
      method: "POST",
      status: 201,
      data: {
        name: user.name,
        email: user.email,
        address: user.address,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "ERROR: Internal Server Error", data: error });
  }
};
