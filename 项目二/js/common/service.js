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
    }],
    modelArr:['单曲播放','单曲循环','列表播放','列表循环','随机播放'],
    currentModelType:0
})
.service('playerManager',['$interval','appConstValue',function($interval,appConstValue){
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
    this.pause = function(){
        player.pause(); // 暂停
        // 播放的图标
        _this.scope.dynamicClass = 'icon-bofang'
        _this.stopUpdataProgressBar();
    }
    this.playOrStop=function(){
        
        if(player.paused){
            _this.play()
        }else {
            _this.pause();
        }
            
    }
    this.getProgressWidth = function(){
        return (player.currentTime / player.duration)*window.screen.width * 2 + 'px';
    }
    this.updataProgressBar = function(){

        if(!this.timer){
            _this.timer = $interval(function(){
                console.log('管理者：我做死的更新进度条')
                var percent  =  player.currentTime / player.duration;
                _this.scope.progress.style.width = _this.getProgressWidth()
                if(percent === 1){
                    _this.resetUI()
                    _this.playWithModel(String(appConstValue.currentModelType));
                }
            },16.7)
        }
    }
    this.resetUI = function(){
        _this.stopUpdataProgressBar();
        _this.scope.progress.style.width = '0px';
        _this.scope.dynamicClass = 'icon-bofang';
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
        _this.$$startElement = event.target;
        _this.progressOriginWidth = _this.getProgressWidth()
    }
    this.fingerMove = function(event){
        _this.finallyPointX  = event.touches[0].pageX + "px";
        _this.scope.progress.style.width = _this.finallyPointX;
        _this.$$endElement = document.elementFromPoint(event.touches[0].pageX,event.touches[0].pageY)
    }
    this.fingerLeave = function(event){
        if(_this.$$startElement === _this.$$endElement){
            _this.scope.progress.style.width = _this.finallyPointX ;
            var currentTime = parseFloat(_this.finallyPointX) / (window.screen.width*2) * player.duration
            _this.setPlayerCurrentTime(currentTime);
            _this.play();
        }else{
            if(player.paused){
                _this.scope.progress.style.width = _this.progressOriginWidth;
            }else{
                _this.updataProgressBar()
            }
        }
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
    this.playWithModel = function(model,isNext){
        
        var modelStr = String(model||appConstValue.currentModelType)
        console.log(modelStr,isNext)
        switch(modelStr){
            case '1':
                if(isNext){
                    _this.nextSong()
                }else{
                    _this.play();
                }
            break;
            case '2':
               
                if(_this.currentSong<_this.scope.musicArr.length-1){
                    _this.nextSong()
                }else if(isNext){
                    _this.nextSong()
                }

            break;
            case '3':
                _this.nextSong();
            break;
            case '4':
                var index;
                do{
                    index = Math.floor(Math.random()*_this.scope.musicArr.length)
                }while(index===this.currentSong)
                this.setSong(index)
                this.play()
            break;
            default:
                if(isNext){
                    _this.nextSong()
                }
            break;
        }
    }
}])