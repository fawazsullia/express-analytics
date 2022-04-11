

interface UC {
    data : any,
    ttl : number,
    addEntry : (ip : string) => void,
    checkUnique : (ip : string)=> 1 | 0
}

class UserCache implements UC {
    data = {};
    ttl;
    constructor(ttl : number) {
        this.data = {}
        this.ttl = ttl
    }

    //chec if the ip is in data
    //if not, set the user with 
    addEntry(ip : string){
        if(ip in this.data){
            return
        }
        else {
            this.data[ip] = {
                initTime : new Date().getTime()
            }
        }
    }

    checkUnique(ip : string){
        if(ip in this.data){
            if(new Date().getTime() - this.data[ip]["initTime"] < this.ttl){
                return 0
            }
            else {
                return 1
            }
        }
        else {
            this.addEntry(ip)
            return 1
        }

    }

    //I can list users
    //then I can check the ttl and first logged time
    //check difference
}

const cache = new UserCache(86400000)

function getUniqueHits(ip : string){
let unique = cache.checkUnique(ip)
return unique

}

module.exports = getUniqueHits