let credentials = {
    secret_key: "1JD4U-S7XB6-GKITA-DQXHP"
}

module.exports = {
    get: () => {
        return credentials
    },
    set: (newCredentials) => {
        credentials = newCredentials
    }
}