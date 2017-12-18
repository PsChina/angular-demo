app.config(['$stateProvider',function($stateProvider){
    $stateProvider.state('discover',{
        url:'/discover',
        templateUrl:'../../template/router-tpls/discover.html',
        controller:['$scope','appConstValue',function($scope,appConstValue){
            $scope.const = appConstValue;
        }]
    })
    .state('music',{
        url:'/music',
        templateUrl:'../../template/router-tpls/music.html'
    })
    .state('friends',{
        url:'/friends',
        templateUrl:'../../template/router-tpls/friends.html'
    })
    .state('discover.gexing',{
        url:'/gexing',
        templateUrl:'../../template/router-tpls/discover/gexing.html'
    })
    .state('discover.gedan',{
        url:'/gedan',
        templateUrl:'../../template/router-tpls/discover/gedan.html'
    })
    .state('discover.diantai',{
        url:'/diantai',
        templateUrl:'../../template/router-tpls/discover/diantai.html'
    })
    .state('discover.paihang',{
        url:'/paihang',
        templateUrl:'../../template/router-tpls/discover/paihang.html'
    })
}])