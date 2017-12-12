angular.module('config')
        .config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider){

            $stateProvider.state('startExam',{
                url:'/startexam',
                templateUrl:'../../template/startexam.html',
                controller:[function(){

                }]
            }).state('historyPaper',{
                url:'/historypaper',
                templateUrl:'../../template/historypaper.html',
                controller:[function(){
                    
                }]
            }).state('startExam',{
                url:'/startexam',
                templateUrl:'../../template/startexam.html',
                controller:[function(){
                    
                }]
            }).state('startExam',{
                url:'/startexam',
                templateUrl:'../../template/startexam.html',
                controller:[function(){
                    
                }]
            })




        }])