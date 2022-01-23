function expressAnalytics({ cb }) {
  const http = require("http");

  return function (req: any, res: any, next: Function) {
    //defining variables for better readability
    let userAgent: string = req.headers["user-ugent"];
    let regexMobi = /.*(mobi).*/gi;
    let regexMini = /.*(mini).*/gi;
    let regexAndroid = /.*(android).*/gi;
    let regexIphone = /.*(iPhone).*/gi;
    let regexWinPhone = /.*(Windows Phone).*/gi;
    let regexIPad = /.*(iPad).*/gi;
    let ip: string = req.socket.remoteAddress;

    //track non unique hits
    let nonUniqueHits: Number = 1;

    //* recognise the device: mobile or tab or desktop
    //if the useragent has "mobi" or "mini" (opera) in it, it is mobile
    function getDeviceType(): string {
      if (regexMobi.test(userAgent) || regexMini.test(userAgent)) {
        return "Mobile";
      } else {
        if (
          regexAndroid.test(userAgent) &&
          regexIPad.test(userAgent) &&
          !regexMobi.test(userAgent)
        ) {
          return "Tablet";
        } else {
          return "Desktop or Other";
        }
      }
    }

    let deviceType: string = getDeviceType();

    //* get the geographic location of the request
    //using a third party api for this
    interface geo {
      country: String;
      regionName: String;
      timeZone: String;
    }

    function getGeographicInfo(): geo {
      let output: geo = {
        country: "No data",
        regionName: "No data",
        timeZone: "No data",
      };

      if (ip) {
        http
          .get(
            `http://ip-api.com/json/${ip}?fields=country,regionName,timeZone`,
            (resp: any) => {
              let data = "";

              resp.on("data", (chunk: any) => {
                data += chunk;
              });

              // The whole response has been received. Print out the result.
              resp.on("end", () => {
                output = JSON.parse(data);
              });
            }
          )
          .on("error", (err: any) => {
            output = output;
            console.log(err);
          });
        return output;
      } else {
        return output;
      }
    }

    let geoDetails = getGeographicInfo();

    //* callback is called here. The function definition for the callback is made in the server. The parameters can be
    //stored in a databased
    cb(
      nonUniqueHits,
      deviceType,
      geoDetails.country,
      geoDetails.regionName,
      geoDetails.timeZone
    );

    //* proceed to the next middleware
    next();
  };
}

module.exports = expressAnalytics;
