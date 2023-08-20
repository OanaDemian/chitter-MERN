import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import server from "../../server.js";
import jwt from "jsonwebtoken";
import sinon from "sinon";
import { User } from "../../models/user.model.js";
import Peep from "../../models/peep.model.js";
import { testDataArray } from '../testData/samplePeeps.js'

chai.use(chaiHttp);

const secret = process.env.SECRET;

describe("Testing requests on the database", () => {
  let token;
  beforeEach(async () => {
      try {
        await Peep.deleteMany();
        console.log(`Database cleared`);
      } catch (error) {
        console.log(`Error clearing`);
        throw error;
      };
      try {
        await Peep.insertMany(testDataArray);
        console.log(`Database populated with test Peeps`);
      } catch (error) {
        console.log(`Error inserting`);
        throw error;
      };
   })
  
  describe("GET / peeps", () => {

    it("should return all of the peeps as an array", async () => {
      const testServer = chai.request(server);
      const res = await testServer
        .get(`/peep`)
        .send();
      expect(res).to.have.status(200);
      expect(res.body).to.be.an("array");
      expect(res.body[0].username).to.exist;
    });

    it("should return a 400 if it cant access the db", async () => {
      const spy = sinon.stub(Peep, "find").throws(new Error("Db could not be accessed"));
      const testServer = chai.request(server);
      const res = await testServer
        .get(`/peep`)
        .send();
      sinon.assert.calledOnce(spy);
      expect(res).to.have.status(400);
    });
  });

  describe("POST / create a peep", () => {
    it("should create a peep that is properly formed", async () => {
      const user = new User({email: "test@test.com", password: "12345678", name: "testName", username: "testUsername" });
      await user.save();
      token = jwt.sign({
          id: user._id.toString(),
          name: user.name,
          username: user.username,
          // Backdate this token of 5 minutes
          iat: Math.floor(Date.now() / 1000) - (5 * 60),
          // Set the JWT token to expire in 10 minutes
          exp: Math.floor(Date.now() / 1000) + (10 * 60)
      }, secret);

      const peep = {
        peep: "Peep peep from Ken",
      }

      const testServer = chai.request(server);
      const res = await testServer
        .post(`/newPeep`)
        .set("x-access-token", token)
        .send(peep);
      expect(res).to.have.status(201);
    });
  });
});
  
