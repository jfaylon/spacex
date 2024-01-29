const request = require("supertest");
const app = require("../../app");

jest.mock("../../services/launchpadService", () => ({
  getLaunchpadInformation: jest.fn(),
  getLaunches: jest.fn(),
}));

const {
  getLaunchpadInformation,
  getLaunches,
} = require("../../services/launchpadService");

describe("Launchpad", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should respond with processed launchpad information", async () => {
    const mockLaunchpadData = {
      name: "Launchpad A",
      launches: ["launchId1", "launchId2"],
    };
    const mockLaunchData = [
      {
        name: "Launch A",
        failures: ["Failure reason 1", "Failure reason 2"],
      },
      {
        name: "Launch B",
        failures: ["Failure reason 3"],
      },
    ];

    getLaunchpadInformation.mockResolvedValue(mockLaunchpadData);
    getLaunches.mockResolvedValue(mockLaunchData);

    const response = await request(app).get("/launchpad/123");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      launchpad: mockLaunchpadData.name,
      all_failures: mockLaunchData,
    });

    expect(getLaunchpadInformation).toHaveBeenCalledWith("123");
    expect(getLaunches).toHaveBeenCalledWith(mockLaunchpadData.launches);
  });
});
