const UserCache = require("./cacheClass")

const cache = new UserCache(5*60*1000)
// const cache = new UserCache(2000)


function getHits(ip : string){
let unique = cache.checkUnique(ip)
return unique

}

module.exports = getHits