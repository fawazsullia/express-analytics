export {}

const UserCache = require("./cacheClass")

const cache = new UserCache(86400000)
// const cache = new UserCache(2000)


function getUniqueHits(ip : string){
let unique = cache.checkUnique(ip)
return unique

}

module.exports = getUniqueHits