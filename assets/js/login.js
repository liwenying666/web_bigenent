$(function() {
    // 点击显示注册事件
    $('#link_reg').on('click', function() {
        $('.reg_box').show()
        $('.login_box').hide()
    })

    // 点击显示登录事件
    $('#link_login').on('click', function() {
        $('.login_box').show()
        $('.reg_box').hide()
    })


    // 表单验证
    var form = layui.form
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        repwd: function(value) {
            var pwd = $('.reg_box [name=password]').val()
            if (pwd !== value) { return '两次密码不一致' }
        }
    })

    // 发起注册ajax请求
    var layer = layui.layer
    $('#form_reg').on('submit', function(e) {
        var username = $('#form_reg [name=username]').val()
        var password = $('#form_reg [name=username]').val()
        e.preventDefault()
        $.post('/api/reguser', { username: username, password: password }, function(res) {
            if (res.status !== 0) {
                return layer.msg(res.status);
            }
            layer.msg('注册成功，请登录！')
        })
        $('#link_login').click()
    })

    // 发起登录ajax请求
    $('#form_login').submit(function(e) {
        e.preventDefault()
        $.ajax({
            url: '/api/login',
            method: 'POST',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('登录失败！')
                }
                layer.msg('登录成功！')
                localStorage.setItem('token', res.token)
                location.href = '/index.html'
            }
        })
    })
})