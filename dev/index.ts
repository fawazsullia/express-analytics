function expressAnalytics(options = { cb }) {
  return function (req: any, res: any, next: Function) {
    //defining variables for better readability
    let userAgent : string = req.headers["user-ugent"];
    let regexMobi = /.*(mobi).*/gi;
    let regexMini = /.*(mini).*/gi;
    let regexAndroid = /.*(android).*/gi;
    let regexIphone = /.*(iPhone).*/gi;
    let regexWinPhone = /.*(Windows Phone).*/gi;
    let regexIPad = /.*(iPad).*/gi;

    //track non unique hits
    let nonUniqueHits: Number = 1;

    //* recognise the device: mobile or tab or desktop
    //if the useragent has "mobi" or "mini" (opera) in it, it is mobile
    function getDeviceType(): string {
      
      if(regexMobi.test(userAgent) || regexMini.test(userAgent)){
          return "Mobile"
      }
      else {
          if(regexAndroid.test(userAgent) && regexIPad.test(userAgent) && !regexMobi.test(userAgent)){
              return "Tablet"
          }
          else {
              return "Desktop or Other"
          }
      }  


    }

    let deviceType : string = getDeviceType()

    //callback is called here. The function definition for the callback is made in the server. The parameters can be
    //stored in a databased
    options.cb(nonUniqueHits, deviceType);

    //proceed to the next middleware
    next();
  };
}

module.exports = expressAnalytics;
