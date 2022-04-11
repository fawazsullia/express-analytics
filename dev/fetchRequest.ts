const http = require("http")

async function fetchRequest(address : string) {
    
return new Promise((resolve,reject)=>{

    let output = {}
    let data = ""
http.get(address, (response : any)=>{
    response.on('data', function (chunk : any) {
        data += chunk;
      });
      response.on('end', function () {
        output = JSON.parse(data)
        resolve(output)
      });
})
.on("error", (err : any)=>{
    reject({country : "No data",
regionName : "No Data",
timezone : "No Data"})
})

    


})

}

module.exports = fetchRequest