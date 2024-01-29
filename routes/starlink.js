const express = require("express");
const router = express.Router();

const { checkDate } = require("../services/starlinkService");

module.exports = (app) => {
  router.get("/", async (req, res, next) => {
    const { year, month, date } = req.query;
    const starlinkData = app.locals?.starlinkData || [];
    const processedStarlinkData = starlinkData.filter((data) => {
      if (!data.spaceTrack.LAUNCH_DATE) {
        return false;
      }
      const launchDateArray = data.spaceTrack.LAUNCH_DATE.split("-");
      const launchYear = launchDateArray[0];
      const launchMonth = launchDateArray[1];
      const launchDate = launchDateArray[2];

      const results = [];

      results.push(checkDate(year, launchYear));
      results.push(checkDate(month, launchMonth));
      results.push(checkDate(date, launchDate));
      return results.every((result) => result === true);
    });
    return res.status(200).send(processedStarlinkData);
  });
  return router;
};
