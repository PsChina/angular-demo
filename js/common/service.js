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