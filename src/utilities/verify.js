const sign = require("../utilities/sign");

module.exports = async function (root) {
    const requestSignature = root.signature;
    delete root.signature;

    const testObject = JSON.parse(JSON.stringify(root))
    return sign(testObject) === requestSignature;
}
