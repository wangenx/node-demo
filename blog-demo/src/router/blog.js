const { SuccessModel, ErrorModel } = require('../model/resModel');
const { getList, getDetail, postNew, postUpdate, getDel } = require('../controller/blog')


const handleBlogRouter = (req, res) => {
    // 获取 GET or POST
    const method = req.method;
    const id = req.query.id;

    // 获取博客列表 list
    if(method === 'GET' && req.path === '/api/blog/list') {
        let author = req.query.author || ''; // 如果没有 author 赋值为空字符串
        const keyword = req.query.keyword || '';
        const result = getList(author, keyword);
        return result.then(listData => {
            return new SuccessModel(listData);
        })
        
    }

    // 获取博客详情 detail
    if(method === 'GET' && req.path === '/api/blog/detail') {
        const result = getDetail(id);
        return result.then(detailData => {
            return new SuccessModel(detailData);
        })
    }

    // 新建博客 new
    if(method === 'POST' && req.path === '/api/blog/new') {
        req.body.author = 'xiaozhao';
        const result = postNew(req.body);
        return result.then(val => {
            if(val) {
                return new SuccessModel();
            }else {
                return ErrorModel('更新博客失败')
            }
            
        })
    }

    // 更新博客 update
    if(method === "POST" && req.path === '/api/blog/update') {
        const result = postUpdate(id, req.body);
        return result.then(data => {
            return new SuccessModel(data);
        })
    }

    // 刪除博客 del
    if(method === "GET" && req.path === '/api/blog/del') {
        const author = 'xiaozhao';
        const result = getDel(id, author);
        return result.then(val => {
            if(val) {
                return new SuccessModel()
            }else {
                return new ErrorModel('删除博客失败')
            }
        })
    }


}

module.exports = handleBlogRouter;