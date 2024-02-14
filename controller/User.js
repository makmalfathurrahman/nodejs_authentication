import { prismaClient } from "../src/prisma-client.js";

export const createUser = async (req, res) => {
  try {
    const { name, email, password, address } = req.body;
    const user = await prismaClient.user.create({
      data: {
        name,
        email,
        password,
        address,
      },
    });

    res.status(201).json({
      method: "POST",
      status: 201,
      data: user,
    });
  } catch (error) {
    res.status(400).json({ message: "ERROR: Bad Request", data: error });
  }
};

export const readUser = async (req, res) => {
  try {
    const user = await prismaClient.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        address: true,
      },
    });

    res.status(200).json({
      method: "GET",
      status: 200,
      data: user,
    });
  } catch (error) {
    res.status(404).json({ message: "ERROR: Not Found", data: error });
  }
};

export const readUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await prismaClient.user.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        address: true,
      },
    });

    res.status(200).json({
      method: "GET",
      status: 200,
      data: user,
    });
  } catch (error) {
    res.status(404).json({ message: "ERROR: Not Found", data: error });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password, address } = req.body;

    const user = await prismaClient.user.update({
      data: {
        name,
        email,
        password,
        address,
      },
      where: {
        id: id,
      },
    });

    res.status(200).json({
      method: "UPDATE",
      status: 200,
      data: user,
    });
  } catch (error) {
    res.status(400).json({ message: "ERROR: Bad Request", data: error });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await prismaClient.user.delete({
      where: {
        id: id,
      },
    });

    res.status(202).json({
      method: "DELETE",
      status: 202,
      data: user,
    });
  } catch (error) {
    res.status(404).json({ message: "ERROR: Not Found", data: error });
  }
};
