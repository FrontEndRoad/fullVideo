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
```
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
