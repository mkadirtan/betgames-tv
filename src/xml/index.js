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

    const xmlObj = builder.buildObject({root: signedObject});
    return xmlObj;
}

async function isValid(request) {
    if (!(typeof request === "string")) {
        return new Error("Request must be string")
    }

    const parser = new Parser({explicitArray: false});
    const [error, xmlObj] = await to(parser.parseStringPromise(request));
    if (error) {
        return new Error("Error while parsing request")
    }

    const {root: requestObj} = xmlObj
    if (!(typeof xmlObj === "object") || !requestObj) {
        return new Error("No root object in request")
    }
    const requestSignature = requestObj.signature;
    requestObj.signature = undefined;

    const testObject = JSON.parse(JSON.stringify(requestObj))
    return sign(testObject) === requestSignature;
}

async function read(request) {
    let error, valid, data;

    [error, valid] = await to(isValid(request));
    if (error) { return error }
    if (!valid) { return new Error("Request signature is invalid") }

    const parser = new Parser({explicitArray: false});
    [error, data] = await to(parser.parseStringPromise(request))
    if(error) { return new Error("Can't parse request")}
    return data;
}

module.exports = {
    create,
    isValid,
    read
}