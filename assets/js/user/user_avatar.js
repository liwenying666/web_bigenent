$(function() {


    var layer = layui.layer
        // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
        // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)

    $('#butChooseImage').on('click', function() {
        $('#file').click()

    })

    // 给文件输入框绑定change事件，替换裁剪取的图片
    $('#file').on('change', function(e) {
        var fileList = e.target.files
            // console.log(fileList);
        if (fileList.length === 0) {
            return layer.msg('请选择文件！')
        }
        var file = fileList[0]
        var imgURL = URL.createObjectURL(file)

        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', imgURL) // 重新设置图片路径
            .cropper(options)

    })

    // 头像提交到服务器

    $('#btnUpload').on('click', function() {
        var dataURL = $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png') // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
        $.ajax({
            method: 'POST',
            url: '/my/update/avatar',
            data: {
                avatar: dataURL
            },
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('头像更新失败！')
                }
                layer.msg('头像更新成功！')
                window.parent.getUserInfo()
                    // $('#image').attr('src', user.user_pic).show()
            }
        })
    })



})