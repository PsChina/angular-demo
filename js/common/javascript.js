require('./service');
require('./filter');
require('./directive');
var app = angular.module('bootstrapApp', ['ui.bootstrap','ngAnimate','ui.router','service','filter','directive']) // 定义模块

module.exports = app;