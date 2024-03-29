$(function() {
    initCate()
    initEditor()

    var layer = layui.layer
    var form = layui.form
        // 初始化文章分类
    function initCate() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('文章类别初始化失败！')
                }
                // console.log(res.data);
                var htmlStr = template('tem_sle', res)
                $('[name=cate_id]').html(htmlStr)
                form.render()
            }
        })
    }

    // 1. 初始化图片裁剪器
    var $image = $('#image')

    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }

    // 3. 初始化裁剪区域
    $image.cropper(options)

    // 为选择封面绑定点击事件
    $('#chooseImage').on('click', function() {
        $('#upImage').click()
    })

    // 监听upImage的变化事件，获取用户选择的文件列表
    $('#upImage').on('change', function(e) {
        var files = e.target.files

        if (files.length === 0) {
            return
        }

        // 创建一个新的图片地址
        var newImage = URL.createObjectURL(files[0])

        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', newImage) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域
    })




    var art_status = '已发布'
        // 为butSave2绑定点击事件
    $('#butSave2').on('click', function() {
        art_status = '草稿'
    })

    // 监听form_pub表单的submit事件
    $('#form_pub').on('submit', function(e) {
        e.preventDefault()
        var fd = new FormData($(this)[0])
        fd.append('state', art_status)

        $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            .toBlob(function(blob) { // 将 Canvas 画布上的内容，转化为文件对象
                // 得到文件对象后，进行后续的操作
                fd.append('cover_img', blob)
                publishAeticle(fd)
            })
    })

    function publishAeticle(fd) {
        $.ajax({
            method: 'POST',
            url: '/my/article/add',
            data: fd,
            contentType: false,
            processData: false,
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('发布文章失败！')
                }
                layer.msg('发布文章成功！')
                location.href = '/article/art_list.html'
            }
        })
    }
})