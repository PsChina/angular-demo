app.config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider){
    $urlRouterProvider.otherwise('/discover')
    $urlRouterProvider.when('/discover','/discover/gexing')
    $stateProvider.state('discover',{
        url:'/discover',
        templateUrl:'../../template/router-tpls/discover.html',
        controller:['$scope','appConstValue','$state',function($scope,appConstValue,$state){
            $state.go('discover.gexing')
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
        templateUrl:'../../template/router-tpls/discover/gexing.html',
        controller:['$scope',function($scope){

            $scope.arr = [
                './img/banner1.jpg',
                './img/banner2.jpg',
                './img/banner3.jpg',
                './img/banner4.jpg'
            ]

        }]
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