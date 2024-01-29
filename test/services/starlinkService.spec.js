const { checkDate } = require("../../services/starlinkService");

describe("startlinkService", () => {
  describe("#checkDate", () => {
    it("should return true due to no query", () => {
      expect(checkDate(undefined, "10")).toEqual(true);
    });
    it("should return false", () => {
      expect(checkDate("10", "20")).toEqual(false);
    });
    it("should return true if numbers match", () => {
      expect(checkDate("10", "10")).toEqual(true);
    })
  });
});
