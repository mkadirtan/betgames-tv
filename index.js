const xml = require("./src/xml");
const credentials = require("./src/utilities/credentials");

module.exports = {
    createSignedXML: xml.create,
    readSignedXML: xml.read,
    verifyXMLSignature: xml.isValid,
    setCredentials: credentials.set
}