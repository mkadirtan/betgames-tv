const sign = require("../utilities/sign");

module.exports.isValid = async function (request) {
    const {root: requestObj} = request
    if (typeof requestObj !== "object" || !requestObj) {
        return new Error("No root object in request")
    }

    const requestSignature = requestObj.signature;
    requestObj.signature = undefined;

    const testObject = JSON.parse(JSON.stringify(requestObj))
    return sign(testObject) === requestSignature;
}
