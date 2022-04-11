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
const http = require("http");
function fetchRequest(address) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            let output = {};
            let data = "";
            http.get(address, (response) => {
                response.on('data', function (chunk) {
                    data += chunk;
                });
                response.on('end', function () {
                    output = JSON.parse(data);
                    resolve(output);
                });
            })
                .on("error", (err) => {
                reject({ country: "No data",
                    regionName: "No Data",
                    timezone: "No Data" });
            });
        });
    });
}
module.exports = fetchRequest;
