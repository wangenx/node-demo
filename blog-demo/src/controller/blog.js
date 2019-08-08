const { exec, escape } = require('../db/mysql');

const getList = (author, keyword) => {
    let sql = `select * from blogs where 1=1 `;
    if(author) {
        sql += `and anthor='${author}' `;
    }
    if(keyword) {
        sql += `and title like '%${keyword}%' `
    }
    sql += `order by createtime desc;`;

    // 返回的是 promise 
    return exec(sql)
}

const getDetail = (id) => {
    const sql = `select * from blogs where id='${id}'`

    return exec(sql).then(rows => {
        return rows[0];
    })
}

const postNew = (newData) => {
    // newData 是一个博客对象，包含 title content 属性
    const title = newData.title;
    const content = newData.content;
    const author  = newData.author;
    const createtime = Date.now();

    const sql = `insert into blogs (title, content, author, createtime) 
                values ('${title}', '${content}', '${author}', '${createtime}')`
   return exec(sql).then(insertData => {
       return {
           id: insertData.insertId
       }
   })
}

const postUpdate = (id, blogData) => {
    // id 是要更新微博的 id
    // blogData 是一个博客对象，包含 title content 属性
    
    const sql = `update blogs set title=${escape(title)}, content=${escape(content)} where id=${escape(id)}`;

    return exec(sql).then(updateData => {
        if(updateData.affectedRows > 0) {
            return true;
        }
        return false;
    })
}

const getDel = (id, author) => {
    // id 是要删除博客的 id
    const Id = escape(id); // 
    const Author = escape(author);
    const sql = `delete from blogs where id=${Id} and author=${Author}`;
    return exec(sql).then(delData => {
        if(delData.affectedRows > 0) {
            return true;
        }
        return false;
    })
}
module.exports = {
    getList,
    getDetail,
    postNew,
    postUpdate,
    getDel
}