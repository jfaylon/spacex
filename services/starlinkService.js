const axios = require("axios");

const getAllStarlinkSatellites = async () => {
  const { data: starlinkData } = await axios.get(
    "https://api.spacexdata.com/v4/starlink"
  );
  return starlinkData;
};

const checkDate = (query, data) => {
  if (query) {
    return Number.parseInt(query) === Number.parseInt(data);
  } else {
    return true;
  }
};

module.exports = {
  getAllStarlinkSatellites,
  checkDate
};
