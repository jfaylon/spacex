const axios = require("axios");
const MockAdapter = require("axios-mock-adapter");
const {
  getLaunchpadInformation,
  getLaunches,
} = require("../../services/launchpadService");

const mockAxios = new MockAdapter(axios);

describe("launchpadService", () => {
  afterEach(() => {
    mockAxios.reset();
  });

  describe("getLaunchpadInformation", () => {
    it("should fetch launchpad information", async () => {
      const mockLaunchpadData = { name: "Launchpad 1", location: "Somewhere" };
      mockAxios
        .onGet("https://api.spacexdata.com/v4/launchpads/launchpad123")
        .reply(200, mockLaunchpadData);

      const result = await getLaunchpadInformation("launchpad123");

      expect(result).toEqual(mockLaunchpadData);
    });
  });

  describe("getLaunches", () => {
    it("should fetch processed launches information", async () => {
      const mockLaunchData = {
        docs: [
          {
            name: "Launch A",
            failures: [
              { reason: "Failure reason 1" },
              { reason: "Failure reason 2" },
            ],
          },
          {
            name: "Launch B",
            failures: [{ reason: "Failure reason B" }],
          },
        ],
      };
      mockAxios
        .onPost("https://api.spacexdata.com/v5/launches/query")
        .reply(200, mockLaunchData);

      const result = await getLaunches(["launchId1", "launchId2"]);

      const expectedProcessedData = [
        {
          name: "Launch A",
          failures: ["Failure reason 1", "Failure reason 2"],
        },
        {
          name: "Launch B",
          failures: ["Failure reason B"],
        },
      ];

      expect(result).toEqual(expectedProcessedData);
    });
  });
});
