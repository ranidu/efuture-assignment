import request from "supertest";
import { User } from "../../model/User";
import mongoose from "mongoose";
import faker from "faker";

let server;
describe("AuthController", () => {
  beforeEach(() => {
    server = require("../../app").startServer(); //established connection
  });
  afterEach(async () => {
    await server.close();
    await User.deleteMany({});
    await mongoose.disconnect();
  });

  describe("/api/auth/login", () => {
    it("should failed - invalid password", async () => {
      const regUser = {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        password: "Test@1234",
        rePassword: "Test@1234",
      };

      await request(server).post("/api/auth/register").send(regUser);

      let response = await request(server)
        .post("/api/auth/login")
        .send({ email: regUser.email, password: "Test@Test" });

      response = JSON.parse(response.text);

      expect(response).toBeDefined();
      expect(response.error_code).toBe("invalid_login");
      expect(response.message).toBe("Invalid email of password");
    });

    it("should successfully logged In", async () => {
      const regUser = {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        password: "Test@1234",
        rePassword: "Test@1234",
      };

      await request(server).post("/api/auth/register").send(regUser);

      let response = await request(server)
        .post("/api/auth/login")
        .send({ email: regUser.email, password: regUser.password });

      expect(response).toBeDefined();
      expect(response.body.token).toBeDefined();
      expect(regUser.email).toBe(response.body.email);
    });
  });
});