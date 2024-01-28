const express = require("express");

const router = express.Router();

const {
  getLaunchpadInformation,
  getLaunches,
} = require("../services/launchpadService");

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  const launchpadData = await getLaunchpadInformation(id);
  const launchData = await getLaunches(launchpadData.launches);
  const processedResult = {
    launchpad: launchpadData.name,
    all_failures: launchData,
  };
  return res.status(200).send(processedResult);
});

module.exports = router;
