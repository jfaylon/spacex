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
      const launchYear = Number.parseInt(launchDateArray[0]);
      const launchMonth = Number.parseInt(launchDateArray[1]);
      const launchDate = Number.parseInt(launchDateArray[2]);

      const results = [];
      
      results.push(checkDate(Number.parseInt(year), launchYear));
      results.push(checkDate(Number.parseInt(month), launchMonth));
      results.push(checkDate(Number.parseInt(date), launchDate));
      return results.every((result) => result === true);
    });
    console.log(processedStarlinkData);
    return res.status(200).send(processedStarlinkData);
  });
  return router;
};
