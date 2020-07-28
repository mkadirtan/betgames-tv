const xml = require("./src/xml");
const credentials = require("./src/utilities/credentials");
const verify = require("./src/utilities/verify");

module.exports = {
    createSignedXML: xml.create,
    readXML: xml.readXML,
    verifySignature: verify,
    setCredentials: credentials.set
}