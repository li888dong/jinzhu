// 微信分享相关
(function () {
    var xhr = new XMLHttpRequest();
    xhr.open('get', 'https://www.hnsjb.cn/v2_api.php?op=generate_sign&url=' + encodeURIComponent(location.href.split('#')[0]));
    xhr.send();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var res = JSON.parse(xhr.responseText);
            wx.config({
                appId: 'wxa874a4ea498e6887', // 必填，企业号的唯一标识，此处填写企业号corpid
                timestamp: res.timestamp, // 必填，生成签名的时间戳
                nonceStr: res.nonceStr, // 必填，生成签名的随机串
                signature: res.signature,// 必填，签名，见附录1
                jsApiList: [
                    'onMenuShareTimeline',
                    'onMenuShareAppMessage',
                    'onMenuShareTimeline',
                    'onMenuShareQQ',
                    'onMenuShareWeibo',
                    'onMenuShareQZone'
                ]
            });
            wx.ready(function () {
                var shareData = {
                    title: document.title, // 分享标题
                    link: document.location.href, // 分享链接，该链接域名必须与当前企业的可信域名一致
                    imgUrl: 'https://www.hnsjb.cn/static/img/wxshare-icon.jpg', // 分享图标
                    desc: '@河南人，快来领取你的福利大礼包！'
                };
                wx.onMenuShareAppMessage(shareData);
                wx.onMenuShareTimeline(shareData);
                wx.onMenuShareAppMessage(shareData);
                wx.onMenuShareQQ(shareData);
                wx.onMenuShareWeibo(shareData);
                wx.onMenuShareQZone(shareData)
            })
        }
    }
})();

// 手机报的百度统计
var _hmt = _hmt || [];
(function () {
    var hm = document.createElement("script");
    hm.src = "https://hm.baidu.com/hm.js?428818587a22359510fbcc475869ae96";
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(hm, s);
})();