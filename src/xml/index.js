const {Builder, Parser} = require("xml2js");
const sign = require("../utilities/sign");
const {to} = require("await-to-js");

async function create(method, token, params = {}, success = 1, error_code = 0, error_text = "") {
    const time = Date.now().toString().slice(0, -3) // Time in seconds, drop last three characters
    const obj = {
        method,
        token,
        success,
        error_code,
        error_text,
        time,
        params
    }

    const signature = sign(obj);
    const signedObject = {...obj, signature};

    const builder = new Builder({
        xmldec: {
            'version': '1.0',
            'encoding': 'UTF-8',
        },
        rootName: 'root'
    })

    return builder.buildObject({root: signedObject});
}

async function readXML(request) {
    const parser = new Parser({explicitArray: false});
    const [error, data] = await to(parser.parseStringPromise(request))
    if(error) { return new Error("Can't parse request")}
    return data;
}

module.exports = {
    create,
    readXML
}