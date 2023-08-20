import sinon from "sinon";
import mongoose from "mongoose";
import { main } from "../../db/main.js";

describe("connecting to the database test", () => {
  it("should call mongoose.connect", (done) => {
    const spy = sinon.stub(mongoose, "connect").returns({});
    main();
    sinon.assert.calledOnce(spy);
    sinon.assert.calledWith(spy, process.env.DBURI);
    mongoose.connect.restore();
    done();
  });

  it("should call mongoose.connect", (done) => {
    const spy = sinon.stub(mongoose, "connect").returns(console.error());
    main();
    sinon.assert.calledOnce(spy);
    sinon.assert.calledWith(spy, process.env.DBURI);
    mongoose.connect.restore();
    done();
  });
});
