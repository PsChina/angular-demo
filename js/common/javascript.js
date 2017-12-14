require('./service');
require('./filter')
var app = angular.module('bootstrapApp', ['ui.bootstrap','ngAnimate','ui.router','service','filter']) // 定义模块

module.exports = app;