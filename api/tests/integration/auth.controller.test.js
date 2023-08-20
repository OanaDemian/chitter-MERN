import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import server from "../../server.js";
import { User } from "../../models/user.model.js";
import { disconnect } from "mongoose";
import bcrypt from "bcrypt";

chai.use(chaiHttp);

describe("Testing requests on the database", () => {

  beforeEach(async () => {
       try {
        await User.deleteMany();
        console.log(`Database cleared`);
      } catch (error) {
        console.log(`Error clearing`);
        throw error;
      };
  })
  describe("POST / auth signin tests", () => {
    it("returns a token when credentials are valid", async () => {
      const user = new User({ email: "test@test.com", password: bcrypt.hashSync("12345678", 8), name: "testName", username: "testUsername" });
      await user.save();
      const testServer = chai.request(server);
      const res = await testServer
        .post("/auth/signin")
        .send({ username: "testUsername", password: "12345678" })
       expect(res).to.have.status(200);
    })

    it("does not return a token when password is invalid", async () => {
      const user = new User({ email: "test@test.com", password: bcrypt.hashSync("12345678", 8), name: "testName", username: "testUsername" });
      await user.save();
      const userToLogin = {
        username: "testUsername",
        password: "123456"
      }
      const testServer = chai.request(server);
      const res = await testServer
        .post("/auth/signin")
        .send(userToLogin)

      expect(res).to.have.status(401)
      expect(res.body.token).to.equal(undefined);
      expect(res).to.have.property("error");
      expect(res.body.message).to.equal("Invalid username/password combination");
    })

    it("does not return a token when username is invalid", async () => {
      const user = new User({ email: "test@test.com", password: bcrypt.hashSync("12345678", 8), name: "testName", username: "testUsername" });
      await user.save();
      const userToLogin = {
        username: "testUsernam",
        password: "12345678"
      }
      const testServer = chai.request(server);
      const res = await testServer
        .post("/auth/signin")
        .send(userToLogin)

      expect(res).to.have.status(404)
      expect(res.body.token).to.equal(undefined)
      expect(res.body.message).to.equal("User not found");
      expect(res).to.have.property("error");
    })
  });

  describe("POST / auth signup tests", () => {
    it("returns 201, when valid username and password credentials are provided", async () => {
      await User.deleteMany({});
      const userToSignUp = {
        "name": "Barbie Doll",
        "username": "Barbie1",
        "email": "barbie@mattel.com",
        "password": "malibu"
      }
      const testServer = chai.request(server);
      const res = await testServer
        .post("/auth/signup")
        .send(userToSignUp)
      const users = await User.find({});
      expect(res).to.have.status(200);
      expect(users[0].username).to.equal("Barbie1");
      
    }) 

    it("creates a new user", async () => {
      await User.deleteMany({});
      const userToSignUp = {
        "name": "Mario Mario",
        "username": "Mario1",
        "email": "mario@nintendo.com",
        "password": "mushroom"
      }
      const testServer = chai.request(server);
      const res = await testServer
        .post("/auth/signup")
        .send(userToSignUp)
      let users = await User.find()
      let newUser = users[users.length - 1]
      expect(newUser.username).to.equal("Mario1")
    })
  });

  describe("POST, auth signup when password is missing", () => {
    it("response code is 400", async () => {
      const testServer = chai.request(server);
      const res = await testServer
        .post("/auth/signup")
        .send({
          "name": "Mario Mario",
          "username": "Mario1",
          "email": "mario@nintendo.com",
        })
      expect(res).to.have.status(422);
    });

    it("does not create a user", async () => {
      const testServer = chai.request(server);
      const res = await testServer
        .post("/auth/signup")
        .send({
          "name": "Mario Mario",
          "username": "Mario1",
          "email": "mario@nintendo.com",
        })
      let users = await User.find()
      expect(users.length).to.equal(0);
    })
  })

  describe("POST, auth signup when email is missing", () => {
    it("response code is 400", async () => {
      const testServer = chai.request(server);
      const res = await testServer
        .post("/auth/signup")
        .send({
          "name": "Mario Mario",
          "username": "Mario1",
          "password": "mushroom"
        })
      expect(res).to.have.status(422);
    });

    it("does not create a user", async () => {
      const testServer = chai.request(server);
      const res = await testServer
        .post("/auth/signup")
        .send({
          "name": "Mario Mario",
          "username": "Mario1",
          "password": "mushroom"
        })
      let users = await User.find()
      expect(users.length).to.equal(0);
    })
  });

  describe("POST, auth signup when username already in use", () => {
    it("response code is 400", async () => {
      const user = new User({ email: "test@test.com", password: bcrypt.hashSync("12345678", 8), name: "testName", username: "testUsername" });
      await user.save();
      const newUserButUsernameAlreadyInUse = {
        "name": "Mario Mario",
        "username": "testUsername",
        "email": "mario@nintendo.com",
        "password": "mushroom"
      }
      const testServer = chai.request(server);
      const res = await testServer
        .post("/auth/signup")
        .send(newUserButUsernameAlreadyInUse)
      expect(res).to.have.status(400);
      expect(res.body.message).to.equal("Failed! Username is already in use!")

    });

    it("does not create a user", async () => {
      const user = new User({ email: "test@test.com", password: bcrypt.hashSync("12345678", 8), name: "testName", username: "testUsername" });
      await user.save();
      const newUserButUsernameAlreadyInUse = {
        "name": "Mario Mario",
        "username": "testUsername",
        "email": "mario@nintendo.com",
        "password": "mushroom"
      }
      const testServer = chai.request(server);
      const res = await testServer
        .post("/auth/signup")
        .send(newUserButUsernameAlreadyInUse)
      let users = await User.find()
      expect(users.length).to.equal(1);
      expect(users[0].username).to.equal("testUsername");
      expect(users[0].name).to.equal("testName");
    })
  });

  describe("POST, auth signup when email is already in use", () => {
    it("response code is 400", async () => {
      const user = new User({ email: "test@test.com", password: bcrypt.hashSync("12345678", 8), name: "testName", username: "testUsername" });
      await user.save();
      const newUserButEmailAlreadyInUse = {
        "name": "Mario Mario",
        "username": "Mario1",
        "email": "test@test.com",
        "password": "mushroom"
      }
      const testServer = chai.request(server);
      const res = await testServer
        .post("/auth/signup")
        .send(newUserButEmailAlreadyInUse)
      expect(res).to.have.status(400);
      expect(res.body.message).to.equal("Failed! Email already in use")
    });

    it("does not create a user", async () => {
      const user = new User({ email: "test@test.com", password: bcrypt.hashSync("12345678", 8), name: "testName", username: "testUsername" });
      await user.save();
      const newUserButUsernameAlreadyInUse = {
        "name": "Mario Mario",
        "username": "Mario1",
        "email": "test@test.com",
        "password": "mushroom"
      }
      const testServer = chai.request(server);
      const res = await testServer
        .post("/auth/signup")
        .send(newUserButUsernameAlreadyInUse)
      let users = await User.find()
      expect(users.length).to.equal(1);
      expect(users[0].username).to.equal("testUsername");
      expect(users[0].email).to.equal("test@test.com");
    })
  });
})