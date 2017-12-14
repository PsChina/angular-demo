angular.module('filter',[])
        .filter('formatOpenState',[function(){
            return function(value){
                return value ? '开放' : '关闭';
            }
        }])