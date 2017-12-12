angular.module('app.left.control',[])
       .controller('appLeftController',['$scope',function($scope){
            $scope.listData = [
                {title:"考试管理",body:["开始考试","历史试卷"]},
                {title:"工具下载",body:["学习工具下载"]},
                {title:"错题管理",body:["上传错题图片"]},
                {title:"图片管理",body:["添加图册","图册列表","添加图片"]}
            ];
       }])
