const bcrypt = require("bcrypt");

const generatePassword = (password) => {
    return bcrypt.hashSync(password,bcrypt.genSaltSync(8),null);
}

const validPassword = (dbPassword,passwordToMatch) => {
    return bcrypt.compareSync(passwordToMatch,dbPassword)
}

module.exports = {
    generatePassword,
    validPassword
}