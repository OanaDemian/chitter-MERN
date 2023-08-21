import bcrypt from "bcrypt";
import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import server from "../../server.js";
import jwt from "jsonwebtoken";
import sinon from "sinon";
import { User } from "../../models/user.model.js";
import Peep from "../../models/peep.model.js";
import { testDataArray } from "../testData/samplePeeps.js";

chai.use(chaiHttp);

const secret = process.env.SECRET;

describe("Testing requests on the database", () => {
  describe("GET / peeps", () => {
    beforeEach(async () => {
      try {
        await Peep.deleteMany();
        console.log(`Database cleared`);
      } catch (error) {
        console.log(`Error clearing`);
        throw error;
      }
      try {
        await Peep.insertMany(testDataArray, {ordered : true });
        console.log(`Database populated with test Peeps`);
      } catch (error) {
        console.log(`Error inserting`);
        throw error;
      }
    });

    it("should return all of the peeps as an array", async () => {
      const testServer = chai.request(server);
      const res = await testServer.get(`/peep`).send();
      expect(res).to.have.status(200);
      expect(res.body).to.be.an("array");
      expect(res.body.length).to.equal(3);
      expect(res.body[0].username).to.exist;
    });


    it("should return all of the peeps in reverse chronological order", async () => {
      const testServer = chai.request(server);
      const res = await testServer.get(`/peep`).send();
      const firstPeepDate = new Date(res.body[2].date);
      const laterPeepDate = new Date(res.body[1].date);
      const latestPeepDate = new Date(res.body[0].date);
      expect(firstPeepDate < laterPeepDate).to.equal(true);
      expect(laterPeepDate < latestPeepDate).to.equal(true);
      expect(firstPeepDate < latestPeepDate).to.equal(true);
    });

    it("should return a 400 if it cant access the db", async () => {
      const spy = sinon
        .stub(Peep, "find")
        .throws(new Error("Db could not be accessed"));
      const testServer = chai.request(server);
      const res = await testServer.get(`/peep`).send();
      sinon.assert.calledOnce(spy);
      expect(res).to.have.status(400);
      Peep.find.restore();
    });
  });

  describe("POST / when token is present", () => {
    let token;
    beforeEach(async () => {
      const user = new User({
        email: "test@test.com",
        password: bcrypt.hashSync("12345678", 8),
        name: "testName",
        username: "testUsername",
      });
      await user.save();
      token = jwt.sign(
        {
          id: user._id.toString(),
          name: user.name,
          username: user.username,
          // Backdate this token of 5 minutes
          iat: Math.floor(Date.now() / 1000) - 5 * 60,
          // Set the JWT token to expire in 10 minutes
          exp: Math.floor(Date.now() / 1000) + 10 * 60,
        },
        secret,
      );
    });

    afterEach(async () => {
      await User.deleteMany({});
      await Peep.deleteMany({});
    });
    it("responds with 201", async () => {
      const peep = {
        content: "Peep peep from Ken",
      };
      const testServer = chai.request(server);
      const res = await testServer
        .post(`/newPeep`)
        .set("x-access-token", token)
        .send(peep);
      expect(res).to.have.status(201);
    });

    it("creates a new peep", async () => {
      const peep = {
        content: "Peep peep from Ken",
      };
      const testServer = chai.request(server);
      const res = await testServer
        .post("/newPeep")
        .set("x-access-token", token)
        .send(peep);
      const peeps = await Peep.find();
      expect(peeps.length).to.equal(1);
      expect(peeps[0].content).to.equal("Peep peep from Ken");
    });
  });

  describe("POST, when token is missing", () => {
    it("responds with a 403 when token is absent", async () => {
      const peep = {
        content: "Peep peep from Ken",
      };
      const testServer = chai.request(server);
      const res = await testServer.post(`/newPeep`).send(peep);
      expect(res).to.have.status(403);
      expect(res.body.message).to.equal("No token provided");
    });

    it("responds with a 401 when the token is present but invalid", async () => {
      const token = "token";
      const peep = {
        content: "Peep peep from Ken",
      };
      const testServer = chai.request(server);
      const res = await testServer
        .post(`/newPeep`)
        .set("x-access-token", token)
        .send(peep);
      expect(res).to.have.status(401);
      expect(res.body.message).to.equal("Unauthorised");
    });

    it("does not create a new peep", async () => {
      const peep = {
        content: "Peep peep from Ken",
      };
      const testServer = chai.request(server);
      const res = await testServer.post(`/newPeep`).send(peep);
      const peeps = await Peep.find(peep);
      expect(peeps.length).to.equal(0);
    });
  });
});
