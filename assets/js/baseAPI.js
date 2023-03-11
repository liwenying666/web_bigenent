// 调用ajax请求前自动调用ajaxPrefilter函数，获取ajax的配置对象

$.ajaxPrefilter(function(options) {
    options.url = 'http://www.liulongbin.top:3007' + options.url
    console.log(options.url);

})