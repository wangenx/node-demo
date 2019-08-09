const { exec, escape } = require('../db/mysql');
const { genPassword } = require('../utils/cryp');

const login = async (username, password) => {
    username = escape(username)
    // password = genPassword(password);
    password = escape(password)
    const sql = `select username, realname from users where username=${username} and password=${password}`

    const rows = await exec(sql)
    return rows[0] || {}

    // return exec(sql).then(rows => {
    //     return rows[0] || {};
    // })
}
module.exports = {
    login
}