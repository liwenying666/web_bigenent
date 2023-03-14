$(function() {
    getUserInfo()

    var layer = layui.layer
        // 点击确认退出功能
    $('#btnLoginOut').on('click', function() {
        layer.confirm('是否确认退出？', { icon: 3, title: '提示' }, function(index) {
            // 清空token
            localStorage.removeItem('token')
                // 跳转至登录页
            location.href = '/login.html'
            layer.close(index);
        });
    })
})

// 获取用户信息
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        success: function(res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败！')
            }
            // 调用renderAvator函数，渲染用户昵称和头像
            renderAvator(res.data)
        }
    })
}

function renderAvator(user) {
    // 获取用户名称
    var name = user.nickname || user.username
    $('#welcome').html('欢迎&nbsp&nbsp' + name)

    if (user.user_pic !== null) {
        // 渲染图片头像
        $('.layui-nav-img').attr('src', user_pic).show()
        $('.user_avator').hide()
    } else {
        // 渲染文本头像
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $('.user_avator').html(first).show

    }
}