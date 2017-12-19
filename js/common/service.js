app.constant('appConstValue',{
    discNavArr:[{
        title:'个性推荐',
        routeName:'discover.gexing'
    },{
        title:'歌单',
        routeName:'discover.gedan'
    },{
        title:'主播电台',
        routeName:'discover.diantai'
    },{
        title:'排行榜',
        routeName:'discover.paihang'
    }]
})
.service('playerManager',['$interval',function($interval){
    // this.play = function(){

    // }
    var _this = this;
    this.timer = null;
    this.currentSong = null;
    this.initPlayer = function(index){
        _this.setSong(index);
        _this.scope.dynamicClass = 'icon-bofang' // init player
    }
    this.initManager = function(scope,index){
        _this.scope = scope;
        _this.initPlayer(index);
    }
    this.play = function(){
        player.play(); // 正在播放
        // 暂停的
        _this.scope.dynamicClass = 'icon-stop'
        _this.updataProgressBar();
    },
    this.stop = function(){
        player.pause(); // 暂停
        // 播放的图标
        _this.scope.dynamicClass = 'icon-bofang'
        _this.stopUpdataProgressBar();
    }
    this.playOrStop=function(){
        
        if(player.paused){
            _this.play()
        }else {
           _this.stop();
        }
            
    }
    this.updataProgressBar = function(){

        if(!this.timer){
            _this.timer = $interval(function(){
                console.log('管理者：我做死的更新进度条')
                var percent  =  player.currentTime / player.duration;
                _this.scope.progress.style.width = percent *window.screen.width * 2 + 'px';
                if(percent === 1){
                    _this.stopUpdataProgressBar();
                    _this.scope.progress.style.width = '0px';
                    _this.scope.dynamicClass = 'icon-bofang';
                }
            },16.7)
        }
    }
    this.setPlayerCurrentTime = function(time){
        player.currentTime = time ;
    }
    this.stopUpdataProgressBar = function(){
        console.log('好了 休息一下吧')
        $interval.cancel(_this.timer);
        _this.timer = null;
    }
    this.fingerTouch = function(event){
        _this.finallyPointX = event.touches[0].pageX + "px";
        _this.stopUpdataProgressBar();
    }
    this.fingerMove = function(event){
        
        _this.finallyPointX  = event.touches[0].pageX + "px";
        _this.scope.progress.style.width = _this.finallyPointX;

    }
    this.fingerLeave = function(event){
        console.log('touchend')
        _this.scope.progress.style.width = _this.finallyPointX ;
        var currentTime = parseFloat(_this.finallyPointX) / (window.screen.width*2) * player.duration
        _this.setPlayerCurrentTime(currentTime);
        _this.play();
    }
    this.setSong = function(index){
        var song = _this.scope.musicArr[index];
        _this.scope.src= song['icon'];
        _this.scope.songName= song['songName'];
        _this.scope.singerName= song['singerName'];
        player.src= song['src'];
        _this.currentSong = index;
        
    }
    this.nextSong = function(){
        var index =  ++_this.currentSong%_this.scope.musicArr.length;
        _this.setSong(index);
        _this.play();
    }
}])