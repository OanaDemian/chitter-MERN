import { formatDate } from "../src/utils/date.js";

describe("format date tests", () => {
  it("formats the date to HH:mm AM//PM · MM DD, YY", () => {
    const mockDate = new Date("2016-02-06T20:20:13Z");
    expect(formatDate(mockDate)).toEqual("20:20 PM · February 6, 2016 ");
  });
});
