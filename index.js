require("dotenv").config();
const { getAllStarlinkSatellites } = require("./services/starlinkService");

(async () => {
  const app = require("./app");
  // fetch all starlink data
  console.log("fetching satellites");
  app.locals.starlinkData = await getAllStarlinkSatellites();
  console.log(app.locals.starlinkData.length);
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
})();
