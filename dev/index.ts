function expressAnalytics(options = { cb : (a)=> {console.log("Hello")}}) {
    return function (req, res, next) {
      //track non unique hits
      let nonUniqueHits = 1;
  
  
        console.log("Does this work man")
  
      //callback is called here. The function definition for the callback is made in the server. The parameters can be 
      //stored in a databased
      options.cb(nonUniqueHits);
  
      //proceed to the next middleware
      next();
    };
  }
  
  module.exports = expressAnalytics;
  