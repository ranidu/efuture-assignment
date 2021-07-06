import request from "supertest";
import { User } from "../../model/User";
import mongoose from "mongoose";
import faker from "faker";

let server;
describe("UserController", () => {
  beforeEach(async() => {
    server = require("../../app").startServer(); //established connection
  });

  afterEach(async () => {
    await server.close();
    await User.deleteMany({})
    await mongoose.disconnect();
  });

  describe("/api/auth/register", () => {
    it("should failed - required field is missing", async () => {
      const regUser = {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        password: "Test@1234",
        rePassword: "Test@1234",
      };
      delete regUser.email;
      let response = await request(server)
        .post("/api/auth/register")
        .send(regUser)
        .expect(400);
  
      response = JSON.parse(response.text);
  
      expect(response).toBeDefined();
      expect(response.error_code).toBe("validation_error");
      expect(response.errors.message).toBe('"email" is required');
    });
  
    it("should failed - password should mismatched", async () => {
      const regUser = {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        password: "Test@1234",
        rePassword: "Test@123",
      };
  
      let response = await request(server)
        .post("/api/auth/register")
        .send(regUser)
        .expect(400);
  
      response = JSON.parse(response.text);
  
      expect(response).toBeDefined();
      expect(response.error_code).toBe("validation_error");
      expect(response.errors.message).toBe('"rePassword" must be [ref:password]');
    });
  
    it("should failed - email must be in valid format", async () => {
      const regUser = {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: 'usermail.lk',
        password: "Test@1234",
        rePassword: "Test@1234",
      };
  
      let response = await request(server)
        .post("/api/auth/register")
        .send(regUser)
        .expect(400);
  
      response = JSON.parse(response.text);
  
      expect(response).toBeDefined();
      expect(response.error_code).toBe("validation_error");
      expect(response.errors.message).toBe('"email" must be a valid email');
    });
  
    it("should register user", async () => {
      const regUser = {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        password: "Test@1234",
        rePassword: "Test@1234",
      };
      const response = await request(server)
        .post("/api/auth/register")
        .send(regUser)
        .expect(200);
  
      expect(regUser.firstName).toBe(response.body.firstName);
      expect(regUser.email).toBe(response.body.email);
    });
  })

  describe("/api/users/profile", () => {
    it("should return logged in user", async() => {
      const regUser = {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        password: "Test@1234",
        rePassword: "Test@1234",
      };

      await request(server)
        .post("/api/auth/register")
        .send(regUser);


      let response = await request(server)
        .post('/api/auth/login')
        .send({email: regUser.email, password: regUser.password});

      response = JSON.parse(response.text);

      response = await request(server)
        .get('/api/users/profile')
        .set('Authorization', response.token)

      expect(response).toBeDefined();
      expect(regUser.email).toBe(response.body.email);

    })
  })
});