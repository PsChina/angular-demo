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