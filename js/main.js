/* -------------------------------------------------------------
    @ 作者：繁花落尽|cici
    @ 时间：2017/01/04
*/
(function($){
    var wid = $(window).width();
    var hei = $(window).height();
    var u = navigator.userAgent;
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    var vid;

    if(isAndroid){
        console.log('安卓');
        $('.wrap').append('<div class="vidDiv aniroid"><video width="100%" height="100%" id="video" class="video" src="video/1.mp4" preload="auto" x5-video-player-type="h5" x5-video-player-fullscreen="true" x5-video-orientation="portraint" x-webkit-airplay="true" webkit-playsinline="true" playsinline="true"></video></div>');
    }
    if(isiOS){
        console.log('苹果');
       $('.wrap').append('<video width="100%" height="100%" id="video" class="video ios" src="video/1.mp4" preload="auto" x5-video-player-type="h5" x5-video-player-fullscreen="true" x5-video-orientation="portraint" x-webkit-airplay="true" webkit-playsinline="true" playsinline="true"></video>');
    }


    vid = document.getElementById('video');
    vid.width = wid;
    vid.height = hei;

    $('.wrap').on('tap', function(){
        console.log('play video')

        $('.vidDiv').addClass('on');
        vidPlay();
    })

    function vidPlay(){
        console.log('start');

        vid.play();
        vid.addEventListener('ended', vidEnd, false);
        /*vid.addEventListener('timeupdate', function(){
            if ( vid.currentTime >= 3 ) {
               vidEnd();
            }
        }, false)*/
    }

    function vidEnd(){
        console.log('video end');

        $('.vidDiv').removeClass('on');
        vid.pause();
        vid.remove();
    }
}(Zepto))