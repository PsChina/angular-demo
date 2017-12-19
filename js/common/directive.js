app.directive('navgation',[function(){
    return {
        restrict:'ECMA',
        templateUrl:'../../template/header.html'
    }
}])
.directive('appFooter',[function(){
    return {
        restrict:'ECMA',
        templateUrl:'../../template/footer.html',
        controller:['$scope','playerManager',function($scope,playerManager){
            $scope.musicArr = [{
                icon:'./img/icon_01.png',
                songName:'听妈妈的话',
                singerName:'周杰伦',
                src:'./mp3/周杰伦 - 听妈妈的话.m4a'
            },{
                icon:'./img/icon_02.png',
                songName:'告白气球',
                singerName:'周杰伦',
                src:'./mp3/周杰伦 - 告白气球.m4a'
            },{
                icon:'./img/icon_03.png',
                songName:'爱我别走',
                singerName:'周杰伦',
                src:'./mp3/周杰伦 - 爱我别走.m4a'
            },{
                icon:'./img/icon_04.png',
                songName:'你不知道的事',
                singerName:'王力宏',
                src:'./mp3/王力宏 - 你不知道的事.mp3'
            }]

            $scope.src="./img/icon_01.png"
            $scope.songName="七里香";
            $scope.singerName="周杰伦";
            $scope.dynamicClass = 'icon-bofang'
            player.src='./mp3/周杰伦 - 听妈妈的话.m4a';

            $scope.manager = playerManager;
            playerManager.initManager($scope,2);


        }],
        scope:true
    }
}])
.directive('ngTouchstart',[function(){
    return function($scope,$element,$attribute){

        $element.on('touchstart',function(event){
            $scope.$event = event;
            $scope.$apply($attribute['ngTouchstart'])
        })

    }
}])
.directive('ngTouchmove',[function(){
    return function($scope,$element,$attribute){

        $element.on('touchmove',function(event){
            $scope.$event = event;
            $scope.$apply($attribute['ngTouchmove'])
        })

    }
}])
.directive('ngTouchend',[function(){
    return function($scope,$element,$attribute){

        $element.on('touchend',function(event){
            $scope.$event = event;
            $scope.$apply($attribute['ngTouchend'])
        })

    }
}])
.directive('letDom',[function(){
    return function($scope,$element,$attribute){
        $scope[$attribute['letDom']] = $element[0];
    }
}])