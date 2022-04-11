function expressAnalytics({ cb }) {
  const http = require("http");
  const fetchRequest = require("./fetchRequest");
  const getDeviceType = require("./getDeviceType")

  return async function (req: any, res: any, next: Function) {
    //defining variables for better readability
    let userAgent: string = req.headers["user-ugent"];
   
    let ip: string = req.socket.remoteAddress;
    let address = `http://ip-api.com/json/${ip}?fields=16649`;

    //track non unique hits
    let nonUniqueHits: Number = 1;

    //* recognise the device: mobile or tab or desktop  

    let deviceType: string = getDeviceType(userAgent);

    //get geographic info:  current : country, region, timezone

    async function getGeographicInfo() {
      try {
        const resp = await fetchRequest(address);
        return resp;
      } catch (e) {
        return e;
      }
    }

    let geoDetails = await getGeographicInfo();

    //* callback is called here. The function definition for the callback is made in the server. The parameters can be
    //stored in a database
    cb(
      nonUniqueHits,
      deviceType,
      geoDetails.country,
      geoDetails.regionName,
      geoDetails.timezone
    );

    next();
  };
}

module.exports = expressAnalytics;
