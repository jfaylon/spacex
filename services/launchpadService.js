const axios = require("axios");

const getLaunchpadInformation = async (launchpadId) => {
  const { data: launchpadData } = await axios.get(
    `https://api.spacexdata.com/v4/launchpads/${launchpadId}`
  );
  return launchpadData;
};

const getLaunches = async (launches) => {
  const { data: launchData } = await axios.post(
    "https://api.spacexdata.com/v5/launches/query",
    {
      query: {
        id: launches,
        failures: {
          $exists: true,
          $ne: [],
        },
      },
      options: {
        sort: {
          date_unix: "desc",
        },
      },
    }
  );
  const processedData = launchData?.docs?.map((data) => {
    const mappedFailures = data.failures.map((failure) => failure.reason);
    return {
      name: data.name,
      failures: mappedFailures,
    };
  });
  return processedData;
};

module.exports = {
  getLaunchpadInformation,
  getLaunches,
};
