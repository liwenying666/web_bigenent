$(function() {
    var form = layui.form
    var layer = layui.layer

    // 自定义表单验证
    form.verify({
        nickname: function(value) {
            if (value.length > 6) {
                return '昵称长度必须在 1 - 6 个字符之间！'
            }
        }
    })

    initUserInfo()

    // 初始化用户信息
    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function(res) {
                if (res.status !== 0) {
                    layer.msg('获取用户信息失败！')
                }
                console.log(res);
                // 调用form.val()方法 快速为表单赋值         
                form.val('formUserInfo', res.data)
            }
        })
    }
    // 监听表单事件
    $('.layui-form').on('submit', function(e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    layer.msg('用户信息提交失败！')
                }
                layer.msg('用户信息提交成功！')
                window.parent.getUserInfo()
            }
        })
    })

    // 重置表单
    $('#btnReset').on('click', function(e) {
        e.preventDefault()
        initUserInfo()
    })
})