const { exec, escape } = require('../db/mysql');
const xss = require('xss');

const getList = async (author, keyword) => {
   let sql = `select * from blogs where 1=1 `;
   if(author) {
       sql += `and author='${author}' `
   }
   if(keyword) {
       sql += `and title like '%${keyword}%' `
   }
   sql += `order by createtime desc;`

   return await exec(sql); 
}

const getDetail = async (id) => {
    const sql = `select * from blogs where id='${id}'`;
    const rows = await exec(sql)
    return rows[0]
    // return await exec(sql).then(rows => {
    //     return rows[0];
    // })
}

const newBlog = async (blogData) => {
    // blogData是一个博客对象，包含title content属性
    const title = blogData.title;
    const content = blogData.content;
    const author = blogData.author;
    const createtime = Date.now();

    const sql = `insert into blogs (title, content, author, createtime) 
                values ('${title}', '${content}', '${author}', ${createtime})`

    const insertData = await exec(sql)
    return {
        id: insertData.insertId
    }     
    
    // promise 写法
    // return exec(sql).then(insertData => {
    //     // console.log('insertData is:' , insertData);
    //     return {
    //         id: insertData.insertId
    //     }
    // })            
}

const updateBlog = async (id, blogData = {}) => {
    // id 就是要更新博客的 id
    // blogData是一个博客对象，包含title content属性
    id = escape(id);
    const title = escape(blogData.title);
    const content = escape(blogData.content);

    const sql = `update blogs set title=${title}, content=${content} where id=${id}`;

    const updateData = await exec(sql)
    // if(updateData.affectedRows > 0) {
    //     return true
    // }
    return updateData.affectedRows > 0? true: false;
    // return false

    // promise 写法
    // return exec(sql).then(updateData => {
    //     console.log('updateData is:', updateData);
    //     if(updateData.affectedRows > 0) {
    //         return true;
    //     }
    //     return false;
    // })
}

const delBlog = async (id, author) => {
    // id 就是要删除博客的 id
    id = escape(id);
    author = escape(author);
    const sql = `delete from blogs where id=${id} and author=${author};`

    const delData = await exec(sql)

    return delData.affectedRows > 0? true:false;

    // Promise 写法
    // return exec(sql).then(delData => {
    //     if(delData.affectedRows > 0) {
    //         return true;
    //     }
    //     return false;
    // })
}


module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
}