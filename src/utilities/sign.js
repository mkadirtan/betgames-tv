const credentials = require("./credentials");
const crypto = require("crypto");

module.exports = function(obj){
    let signature = ""
    for (const key of Object.keys(obj)){
        if(typeof obj[key] === "object"){
            for(const _key of Object.keys(obj[key])){
                signature += _key + obj[key][_key]
            }
        } else {
            signature += key + obj[key]
        }

    }
    signature += credentials.get().secret_key;
    return crypto.createHash("md5").update(signature).digest("hex");
}