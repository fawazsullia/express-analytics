"use strict";
let regexMobi = /.*(mobi).*/gi;
let regexMini = /.*(mini).*/gi;
let regexAndroid = /.*(android).*/gi;
let regexIphone = /.*(iPhone).*/gi;
let regexWinPhone = /.*(Windows Phone).*/gi;
let regexIPad = /.*(iPad).*/gi;
function getDeviceType(userAgent) {
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
module.exports = getDeviceType;
