$(function() {
    var layer = layui.layer
    var form = layui.form
    initArtCteList()
        // 获取文章分类
    function initArtCteList() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function(res) {
                console.log(res);
                var htmlStr = template('tem-table', res)
                $('tbody').html(htmlStr)
            }
        })
    }
    // 点击按钮实现弹出框
    var indexAdd = null
    $('#btnAddCate').on('click', function() {
        indexAdd = layer.open({
            type: 1,
            area: ['500px', '270px'],
            title: '添加类别',
            content: $('#tab-add').html()
        });
    })

    // 代理方式监听提交事件
    $('body').on('submit', '#form-add', function(e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function(res) {
                console.log(res);

                if (res.status !== 0) {
                    layer.close(indexAdd)
                    return layer.msg('新增分类失败!')


                }
                initArtCteList()
                layer.msg('新增分类成功!')
                layer.close(indexAdd)
            }
        })
    })

    //代理方式为编辑按钮绑定点击事件
    var indexEdit = null
    $('tbody').on('click', '#btn-edit', function() {
            indexEdit = layer.open({
                type: 1,
                area: ['500px', '270px'],
                title: '添加类别',
                content: $('#tab-edit').html()
            });

            // 获取当前点击数据项的id值
            var id = $(this).attr('data-Id')
            $.ajax({
                method: 'GET',
                url: '/my/article/cates/' + id,
                success: function(res) {
                    // console.log(res.data);
                    form.val('form-edit', res.data)
                }
            })

        })
        // 通过代理的方式为编辑按钮监听提交事件
    $('body').on('submit', '#form-edit', function(e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    console.log(res.message);
                    return layer.msg('更新分类数据失败！')
                }
                layer.msg('更新分类数据失败！')
                layer.close(indexEdit)
                initArtCteList()
            }
        })
    })

    // 通过代理的方式为删除按钮监听点击事件
    $('tbody').on('click', '#but-del', function() {
        var id = $(this).attr('data-Id')
        layer.confirm('是否确认删除?', { icon: 3, title: '提示' }, function(index) {
            $.ajax({
                method: 'GET',
                url: '/my/article/deletecate/' + id,
                success: function(res) {
                    if (res.status !== 0) {
                        layer.msg('删除数据失败！')
                    }
                    layer.msg('删除数据成功！')
                    initArtCteList()
                }
            })
            layer.close(index);
        })
    })
})