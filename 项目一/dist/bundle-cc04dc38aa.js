(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var rem = require('./js/base/rem');
require('./js/common/javascript');
require('./js/common/mianController');
require('./js/common/appLeftController');
require('./js/common/appRightController');
require('./js/common/config');
angular.bootstrap(document.documentElement, ['bootstrapApp','mainControl','app.left.control','app.right.control','config']) // 注入模块
rem(13.66);

},{"./js/base/rem":2,"./js/common/appLeftController":3,"./js/common/appRightController":4,"./js/common/config":5,"./js/common/javascript":8,"./js/common/mianController":9}],2:[function(require,module,exports){
function rem(value){
	
	document.documentElement.style.fontSize = window.screen.width/value + 'px';
	window.onresize = function() {
		document.documentElement.style.fontSize = window.screen.width/value + 'px';	
	}
}

module.exports = rem;


},{}],3:[function(require,module,exports){
angular.module('app.left.control',[])
       .controller('appLeftController',['$scope',function($scope){
            $scope.listData = [
                {title:"考试管理",body:[{
                    title:"开始考试",
                    routername:'startExam'
                },{
                    title:"历史试卷",
                    routername:'historyPaper'
                }]},
                {title:"工具下载",body:[{
                    title:"学习工具下载",
                    routername:'toolDownload'
                }]},
                {title:"错题管理",body:[{
                    title:"上传错题图片",
                    routername:'wrongTopicManage'
                }]},
                {title:"图片管理",body:[{
                    title:"添加图册",
                    routername:'addImages'
                },{
                    title:"图册列表",
                    routername:'images'
                },{
                    title:"添加图片",
                    routername:'addImage'
                }]}
            ];
       }])

},{}],4:[function(require,module,exports){
angular.module('app.right.control',[])
.controller('appRightController',['$scope',function($scope){
    
}])
},{}],5:[function(require,module,exports){
module.exports = angular.module('config',[])
        .config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider){


            $urlRouterProvider.otherwise('/welcome')
            $stateProvider.state('startExam',{
                url:'/startexam',
                templateUrl:'../../template/startexam.html',
                controller:['$scope','ajax',function($scope,ajax){
                    $scope.data =  ajax({
                        url:'http://169.254.206.26:3000/startexam'
                    })
                    console.log($scope.data);

                    $scope.delete = function(id){
                        console.log('删除',id)
                        $scope.data = ajax({
                            url:'http://169.254.206.26:3000/deleteexam',
                            method:'POST',
                            data:{
                                id:id
                            }
                        })
                    }
                    $scope.edit = function(event,item){
                        item.show = !item.show;
                        if(event.target.innerText === '编辑' ){
                            event.target.innerText = '确定'

                            item.isOpenFormat = item.isOpen? '开放' : '关闭';
                            var startTime = new Date(item.startTime);
                            item.startTimeFormat = `${startTime.getFullYear()}-${startTime.getMonth()+1}-${startTime.getDate()} ${startTime.getHours()}:${startTime.getMinutes()}:${startTime.getSeconds()}`
                            var endTime = new Date(item.endTime);
                            item.endTimeFormat = `${endTime.getFullYear()}-${endTime.getMonth()+1}-${endTime.getDate()} ${endTime.getHours()}:${endTime.getMinutes()}:${endTime.getSeconds()}`
                            console.log(item.endTimeFormat)
                            item.isOpen = item.isOpenFormat === '开放' ? true : false;
                            item.startTime = new Date(item.startTimeFormat);
                            item.endTime = new Date(item.endTimeFormat);                            
                        }else {
                            event.target.innerText = '编辑'

                            // 开始保存
                            item.isOpen = item.isOpenFormat === '开放' ? true : false;
                            item.startTime = new Date(item.startTimeFormat).getTime();
                            item.endTime = new Date(item.endTimeFormat).getTime();

                            // 发送网络请求 修改后端数据;

                            $scope.data[item.id] = ajax({
                                url:'http://169.254.206.26:3000/edit',
                                method:'POST',
                                data:{
                                    id:item.id,
                                    item:item
                                }    
                            })

                        }

                    }
                }]
            }).state('historyPaper',{
                url:'/historypaper',
                templateUrl:'../../template/historypaper.html',
                controller:[function(){
                    
                }]
            }).state('toolDownload',{
                url:'/tooldownload',
                templateUrl:'../../template/tooldownload.html',
                controller:[function(){
                    
                }]
            }).state('wrongTopicManage',{
                url:'/wrongtopicmanage',
                templateUrl:'../../template/wrongtopicmanage.html',
                controller:[function(){
                    
                }]
            }).state('addImages',{
                url:'/addimages',
                templateUrl:'../../template/addimages.html',
                controller:[function(){
                    
                }]
            }).state('images',{
                url:'/images',
                templateUrl:'../../template/images.html',
                controller:[function(){
                    
                }]
            }).state('addImage',{
                url:'/addimage',
                templateUrl:'../../template/addimage.html',
                controller:[function(){
                    
                }]
            }).state('welcome',{
                url:'/welcome',
                templateUrl:'../../template/welcome.html'
            })




        }])
},{}],6:[function(require,module,exports){

angular.module('directive', [])
    .directive('pagecontrol', [function () {
        return {
            restrict: 'ECMA',
            templateUrl: '../template/directive/pagecontrol.html',
            controller: ['$scope', function ($scope) {
                $scope.maxPage = 10;

                $scope.btnArr = [2, 3, 4, 5];
                // console.log('123',pagecontrolManage);
                // pagecontrolManage.setScope($scope);

                // pagecontrolManage.initPageConrtol($scope.maxPage);
                this.manager = {
                    scope: $scope,
                    initPageConrtol: function () {
                        var arr = [];
                        var maxPage = this.scope.maxPage
                        if (maxPage > 2 && maxPage<=6) {
                            arr = new Array(maxPage - 2);
                        } else {
                            arr = new Array(4);
                        }
                        console.log(123,arr)
                        arr.forEach(function(value,index,array){
                            
                            array[index] = index + 1;
                        })

                        this.scope.btnArr = arr;
                    }
                }

                this.manager.initPageConrtol();
            }],
            link: function ($scope, $element, $attribute) {

            }
        }
    }])
},{}],7:[function(require,module,exports){
angular.module('filter',[])
        .filter('formatOpenState',[function(){
            return function(value){
                return value ? '开放' : '关闭';
            }
        }])
},{}],8:[function(require,module,exports){
require('./service');
require('./filter');
require('./directive');
var app = angular.module('bootstrapApp', ['ui.bootstrap','ngAnimate','ui.router','service','filter','directive']) // 定义模块

module.exports = app;
},{"./directive":6,"./filter":7,"./service":10}],9:[function(require,module,exports){
module.exports = angular.module('mainControl',[]).controller('main',['$scope',function($scope){
    
    $scope.username = '管理员'
    
}])

},{}],10:[function(require,module,exports){
angular.module('service',[])
        .factory('ajax',['$http','$q',function($http,$q){

            function fn (obj){
               return $http(obj) // $http 本身是个promise
                .then(function(result){
                    return result.data;
                },function(error){
                    throw new Error(error);
                })

            }

            return fn;

        }])
},{}]},{},[1]);
