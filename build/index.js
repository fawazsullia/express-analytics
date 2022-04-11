"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function expressAnalytics({ cb }) {
    const http = require("http");
    return function (req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            //defining variables for better readability
            let userAgent = req.headers["user-ugent"];
            let regexMobi = /.*(mobi).*/gi;
            let regexMini = /.*(mini).*/gi;
            let regexAndroid = /.*(android).*/gi;
            let regexIphone = /.*(iPhone).*/gi;
            let regexWinPhone = /.*(Windows Phone).*/gi;
            let regexIPad = /.*(iPad).*/gi;
            // let ip: string = req.socket.remoteAddress;
            let ip = "86.97.149.62";
            //track non unique hits
            let nonUniqueHits = 1;
            //* recognise the device: mobile or tab or desktop
            //if the useragent has "mobi" or "mini" (opera) in it, it is mobile
            function getDeviceType() {
                if (regexMobi.test(userAgent) || regexMini.test(userAgent)) {
                    return "Mobile";
                }
                else {
                    if (regexAndroid.test(userAgent) &&
                        regexIPad.test(userAgent) &&
                        !regexMobi.test(userAgent)) {
                        return "Tablet";
                    }
                    else {
                        return "Desktop or Other";
                    }
                }
            }
            let deviceType = getDeviceType();
            function getGeographicInfo() {
                let output = {
                    country: "No data",
                    regionName: "No data",
                    timeZone: "No data",
                };
                if (ip) {
                    http
                        .get(`http://ip-api.com/json/${ip}?fields=country,regionName,timeZone`, (resp) => {
                        let data = "";
                        resp.on("data", (chunk) => {
                            data += chunk;
                        });
                        // The whole response has been received. Print out the result.
                        resp.on("end", () => {
                            output = JSON.parse(data);
                            return output;
                        });
                    })
                        .on("error", (err) => {
                        return output;
                    });
                }
                else {
                    return output;
                }
            }
            let geoDetails = yield getGeographicInfo();
            //* callback is called here. The function definition for the callback is made in the server. The parameters can be
            //stored in a databased
            cb(nonUniqueHits, deviceType, geoDetails.country, geoDetails.regionName, geoDetails.timeZone);
            //* proceed to the next middleware
            next();
        });
    };
}
module.exports = expressAnalytics;
