(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var rem = require('./js/base/rem');
require('./js/common/javascript');
require('./js/common/mianController');
require('./js/common/appLeftController');
require('./js/common/appRightController');
angular.bootstrap(document.documentElement, ['bootstrapApp','mainControl']) // 注入模块
rem(13.66);

},{"./js/base/rem":2,"./js/common/appLeftController":3,"./js/common/appRightController":4,"./js/common/javascript":5,"./js/common/mianController":6}],2:[function(require,module,exports){
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
            $scope.listData = [];
       }])
},{}],4:[function(require,module,exports){
angular.module('app.right.control',[])
.controller('appRightController',['$scope',function($scope){
    
}])
},{}],5:[function(require,module,exports){
var app = angular.module('bootstrapApp', ['ui.bootstrap','ngAnimate']) // 定义模块

module.exports = app;
},{}],6:[function(require,module,exports){
module.exports = angular.module('mainControl',[]).controller('main',['$scope',function($scope){
    
    $scope.username = '管理员'
    
}])

},{}]},{},[1]);
