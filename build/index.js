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
    const fetchRequest = require("./fetchRequest");
    const getDeviceType = require("./getDeviceType");
    const getUniqueHits = require("./getUniqueHits");
    const getHits = require("./getHits");
    return function (req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const path = req.path;
            //apis and styles and script should not trigger this
            // function checkExcludePaths(){
            //     excludedPaths.
            // }    
            //defining variables for better readability
            let userAgent = req.headers["user-ugent"];
            // let ip: string = req.socket.remoteAddress;
            let ip = "86.97.149.62";
            let address = `http://ip-api.com/json/${ip}?fields=16649`;
            //track non unique hits
            let nonUniqueHits = getHits(ip);
            //track unique hits : 1 day gap
            let uniqueHit = getUniqueHits(ip);
            //* recognise the device: mobile or tab or desktop  
            let deviceType = getDeviceType(userAgent);
            //get geographic info:  current : country, region, timezone
            function getGeographicInfo() {
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        const resp = yield fetchRequest(address);
                        return resp;
                    }
                    catch (e) {
                        return {
                            country: "No data",
                            region: "No data",
                            timezone: "No data"
                        };
                    }
                });
            }
            let geoDetails = yield getGeographicInfo();
            //* callback is called here. The function definition for the callback is made in the server. The parameters can be
            //stored in a database
            cb(nonUniqueHits, uniqueHit, deviceType, geoDetails.country || "No data", geoDetails.regionName || "No data", geoDetails.timezone || "No data");
            next();
        });
    };
}
module.exports = expressAnalytics;
