$(function() {
    initTable()
        // 定义查询参数对象
    var q = {
        pagenum: 1,
        pagesize: 2,
        cate_id: '',
        state: ''
    }
    var layer = layui.layer
        // 获取文章列表数据
    function initTable() {
        $.ajax({
            method: 'GET',
            url: '/my/article/list',
            data: q,
            success: function(res) {
                if (res.status !== 0) {
                    console.log(res.message);
                    return layer.msg('文章列表数据获取失败！')
                }
                // 利用模板引擎渲染数据
                var htmlStr = tempalte('tem-table', res)
                $('tbody').html(htmlStr)
            }
        })
    }
})