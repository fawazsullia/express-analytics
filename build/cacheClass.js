"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UserCache {
    constructor(ttl) {
        this.data = {};
        this.data = {};
        this.ttl = ttl;
    }
    //chec if the ip is in data
    //if not, set the user with 
    addEntry(ip) {
        if (ip in this.data) {
            return;
        }
        else {
            this.data[ip] = {
                initTime: new Date().getTime()
            };
        }
    }
    checkUnique(ip) {
        if (ip in this.data) {
            if (new Date().getTime() - this.data[ip]["initTime"] <= this.ttl) {
                return 0;
            }
            else {
                this.data[ip]["initTime"] = new Date().getTime();
                return 1;
            }
        }
        else {
            this.addEntry(ip);
            return 1;
        }
    }
}
module.exports = UserCache;
