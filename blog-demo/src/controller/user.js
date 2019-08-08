const { exec, escape } = require('../db/mysql');

const login = (username, password) => {
    const Username = escape(username);
    const Password = escape(password);
    const sql = `select username, realname from users where username=${Username} and password=${Password}` 

    return exec(sql).then(rows => {
        return rows[0] || {};
    })
}

module.exports = {
    login
};