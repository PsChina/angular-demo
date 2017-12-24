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
    $scope.msg = 'hello'
    $scope.items = [
        'The first choice!',
        'And another choice for you.',
        'but wait! A third!'
      ];
    
      $scope.status = {
        isopen: false
      };
    
      $scope.toggled = function(open) {
        $log.log('Dropdown is now: ', open);
      };
    
      $scope.toggleDropdown = function($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.status.isopen = !$scope.status.isopen;
      };
    
      $scope.appendToEl = angular.element(document.querySelector('#dropdown-long-content'));    
}])

},{}]},{},[1]);
