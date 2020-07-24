const {Builder, Parser} = require("xml2js");
const fs = require("fs").promises;
const path = require("path");

async function create(method, token, params, success = 1, error_code = 0, error_text = ""){
    const builder = new Builder({
        xmldec: {
            'version': '1.0',
            'encoding': 'UTF-8',
        },
        rootName: 'root'
    })
    const obj = builder.buildObject({root: {foo: "sadasd"}});
    return fs.writeFile(path.join(__dirname, "test.xml"), obj)
}

module.exports = {
    create
}