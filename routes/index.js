import express from "express";
import { createUser, readUser, readUserById, updateUser, deleteUser } from "../controller/User.js";
import { createUserRegister } from "../controller/Register.js";
import { postUserLogin } from "../controller/Login.js";
import { loginAuthentication } from "../middleware/LoginAuth.js";

const route = express.Router();

// Create
route.post("/user", createUser);
route.post("/register", createUserRegister);
route.post("/login", postUserLogin);

// Read
route.get("/users", loginAuthentication, readUser);

// Read by ID
route.get("/user/:id", loginAuthentication, readUserById);

// Update
route.patch("/user/:id", updateUser);

// Delete
route.delete("/user/:id", deleteUser);

export default route;
