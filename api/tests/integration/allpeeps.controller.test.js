import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import server from "../../server.js";
import sinon from "sinon";
import Peep from "../../models/peep.model.js";
import { testDataArray } from '../samplePeeps.js';

chai.use(chaiHttp);

describe("Testing requests on the database", () => {
  describe("GET / tests", () => {

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
    it("should return all of the peeps as an array", async () => {
      const testServer = chai.request(server);
      const res = await testServer
        .get(`/`)
        .send();
      expect(res).to.have.status(200);
      expect(res.body).to.be.an("array");
      expect(res.body[0].username).to.exist;
    });

    it("should return a 400 if it cant access the db", async () => {
      const spy = sinon.stub(Peep, "find").throws(new Error("Fiddle sticks"));
      const testServer = chai.request(server);
      const res = await testServer
        .get(`/`)
        .send();
      
            sinon.assert.calledOnce(spy);

      expect(res).to.have.status(400);
    });
  });
   });
  
