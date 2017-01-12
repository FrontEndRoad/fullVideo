### HTML5视频全屏播放

#### 一、设置video属性(video.html)
``` html
<video src="video/1.mp4" webkit-playsinline="" playsinline="" x-webkit-airplay="true" airplay="allow" x5-video-player-type="h5" x5-video-player-fullscreen="true" 
x5-video-orientation="portraint" reload="auto" id="video"></video>
```
**说明：**这种方式最为简单快捷，但在安卓下视频播放完会显示广告页，无法自动跳走（解决方案参考方案二）


#### 二、JS动态生成(index.html)
``` js
var u = navigator.userAgent;
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端   

    if(isAndroid){
        console.log('安卓');
        $('.wrap').append('<div class="vidDiv aniroid"><video width="100%" height="100%" id="video" class="video" src="video/1.mp4" preload="auto" x5-video-player-type="h5" x5-video-player-fullscreen="true" x5-video-orientation="portraint" x-webkit-airplay="true" webkit-playsinline="true" playsinline="true"></video></div>');
    }
    if(isiOS){
        console.log('苹果');
       $('.wrap').append('<video width="100%" height="100%" id="video" class="video ios" src="video/1.mp4" preload="auto" x5-video-player-type="h5" x5-video-player-fullscreen="true" x5-video-orientation="portraint" x-webkit-airplay="true" webkit-playsinline="true" playsinline="true"></video>');
    }
```
**说明：**通过判断设备针对IOS、Android分开处理，以达到更好的兼容，推荐使用


#### 三、canvas渲染(canvas.html)
``` js
var can = document.getElementById('can')||document.createElement('canvas'),
ctx = can.getContext('2d'),
vid = document.getElementById('vid')||document.createElement('video'),
wid = $(window).width(),
hei = $(window).height()

can.id = 'can';				
vid.width = wid;
vid.height = hei;
vid.src = 'video/1.mp4';
vid.autoplay = 'autoplay';

document.getElementById('wrap').appendChild(can);
vid.addEventListener('play', function(){
	can.width = vid.width;
	can.height = vid.height;
	draw(this, ctx, wid, hei);
}, false)

function draw(v, c, w, h){
	if(v.paused || v.ended)  return false;
	c.drawImage(v, 0, 0, w, h);
	setTimeout(draw,20,v,c,w,h);
}
```
**说明：**安卓下对canvas绘制视频识别不是很好


#### 四、扩展篇

##### 1、基本属性

- src          路径
- width/height 宽高
- poster       封面图
- preload      预加载
- autoplay     自动播放
- loop         循环播放
- controls     浏览器自带控制条
- webkit-playsinline="true" | "playsinline"   禁止webkit内核下视频自动全屏
- x-webkit-ariplay = "true"                   支持airplay的设备
- currentSrc	返回资源地址
- currentTime	返回当前播放进度，可设置
- duration	返回资源总时长
- paused	资源是否已停止
- ended	        资源是否已播完

``` html
<video id="video" src="mov.mp4" preload="auto" poster="" currenttime=0 webkit-playsinline="true" playsinline loop x-webkit-airplay="true" controls autoplay>
```

##### 2、事件

- canplaythrough    表示资源缓冲完毕，可以播放
- durationchange    资源长度改变，执行一次
- play	        资源实际开始播放，autoplay和play()都会触发play事件
- playing	同上 执行一次
- pause	        暂停时触发
- progress	资源播放过程中多次执行
- ended	        结束时触发


##### 3、方法

- play()	播放资源
- pause()	暂停资源
- load()	重新加载src指定的资源


#### 五、这些年，我们走过的坑？

**问题：**微信X5浏览器打开时，视频会自动全屏播放，并且结束时会出现腾讯视频的广告

**方案：**给video标签添加属性 webkit-playsinline="true" playsinline="true" 可解决IOS、部分安卓机的问题

**说明：**微信团队对视频来源进行了域名限制，挂载在qq域名下可解决以上问题，目前申请白名单是关闭状态。可以使用以下方式：

##### 1、同层播放器

- 使用x5-video-player-type声明启用同层H5播放器

``` html
<video src="" x5-video-player-type="h5"></video>
```

- 使用x5-video-player-fullscreen 重新适配新视口大小，默认进入是全屏播放

``` html
<video src="" x5-video-player-type="h5" x5-video-player-fullscreen="true"></video>
```

##### 2、canvas绘制

**说明：**参考以上第三条（canvas渲染），通过一些H5视频插件做兼容





