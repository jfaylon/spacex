const { checkDate } = require("../services/starlinkService");

describe("startlinkService", () => {
  describe("#checkDate", () => {
    it("should return true due to no query", () => {
      expect(checkDate(undefined, "10")).toEqual(true);
    });
  });
});
