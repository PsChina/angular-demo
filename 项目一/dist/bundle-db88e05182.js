(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var rem = require('./js/base/rem');
require('./js/common/javascript');
require('./js/common/mianController')
angular.bootstrap(document.documentElement, ['bootstrapApp','mainControl']) // 注入模块
rem(13.66);

},{"./js/base/rem":2,"./js/common/javascript":3,"./js/common/mianController":4}],2:[function(require,module,exports){
function rem(value){
	
	document.documentElement.style.fontSize = window.screen.width/value + 'px';
	window.onresize = function() {
		document.documentElement.style.fontSize = window.screen.width/value + 'px';	
	}
}

module.exports = rem;


},{}],3:[function(require,module,exports){
var app = angular.module('bootstrapApp', ['ui.bootstrap','ngAnimate']) // 定义模块

module.exports = app;
},{}],4:[function(require,module,exports){
module.exports = angular.module('mainControl',[]).controller('main',['$scope',function($scope){
    
    $scope.username = '管理员'

    $scope.oneAtATime = true;
    
      $scope.groups = [
        {
          title: 'Dynamic Group Header - 1',
          content: 'Dynamic Group Body - 1'
        },
        {
          title: 'Dynamic Group Header - 2',
          content: 'Dynamic Group Body - 2'
        }
      ];
    
      $scope.items = ['Item 1', 'Item 2', 'Item 3'];
    
      $scope.addItem = function() {
        var newItemNo = $scope.items.length + 1;
        $scope.items.push('Item ' + newItemNo);
      };
    
      $scope.status = {
        isCustomHeaderOpen: false,
        isFirstOpen: true,
        isFirstDisabled: false
      };    
}])

},{}]},{},[1]);
