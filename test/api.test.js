import request from "supertest";
import app from "../index.js";
import { prismaClient } from "../src/prisma-client.js";
import { createUser, readUser } from "../controller/User.js";

describe("API Test", () => {
  it("CREATE Data", async () => {
    const res = await request(app).post("/user").send({
      name: "Nerty Ferraro",
      email: "nferraro1@ameblo.jp",
      password: "hQ3$",
      address: "Colombia",
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("id");
    userId = res.body.id;
  });

  it("READ Data", async () => {
    const response = await readUser();
    expect(response.length).toBeGreaterThan(0);
  });
});
