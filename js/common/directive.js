
angular.module('directive', [])
    .directive('pagecontrol', [function () {
        return {
            restrict: 'ECMA',
            templateUrl: '../template/directive/pagecontrol.html',
            controller: ['$scope','ajax','$http', function ($scope,ajax,$http) {



                $scope.promise = ajax({
                    url:'http://169.254.206.26:3000/maxpage',
                    method:'POST',
                    data:{
                        number:4
                    }
                })
                
                var _this = this;

                $scope.$watch('promise.$$state.value',function(newVal){

                    if(newVal&&newVal.maxPage){
                        $scope.maxPage = newVal.maxPage;
                        _this.manager.initPageConrtol()
                        _this.manager.current = 1;
                        _this.manager.go(_this.manager.current);                        
                    }
                })
                

                // $scope.btnArr = [2, 3, 4, 5];
                // console.log('123',pagecontrolManage);
                // pagecontrolManage.setScope($scope);

                // pagecontrolManage.initPageConrtol($scope.maxPage);
                this.manager = {
                    current:1,
                    scope: $scope,
                    initPageConrtol: function () {
                        var arr = [];
                        var maxPage = this.scope.maxPage
                        if (maxPage > 2 && maxPage<=6) {
                            arr = new Array(maxPage - 2);
                            this.scope.pre = false;
                            this.scope.next = false;
                        } else if(maxPage<=2){
                            this.scope.pre = false;
                            this.scope.next = false;
                        } else{
                            arr = new Array(4);
                            this.scope.pre = false;
                            this.scope.next = true;
                        }

                        for(var i = 0,length = arr.length ; i<length; i++ ){
                            arr[i] = i+2;
                        }

                        this.scope.btnArr = arr; // 渲染动态按钮的数组
                    },
                    go:function(nextPage){  
                        console.log(nextPage);

                        var _this = this;

                        $http({
                            url:'http://169.254.206.26:3000/pagedata',
                            data:{
                                pageIndex:nextPage,
                                number:4
                            },
                            method:'POST'
                        })
                        .then(function(result){
                            _this.scope.listData = result.data;
                        },function(error){
                            throw new Error(error)
                        })
                        

                        this.scope.firstBtnClass = '';
                        this.scope.lastBtnClass = '';

                        for(var i = 0 ; i<this.scope.btnArr.length ; i++){
                            this.scope['active'+this.scope.btnArr[i] ] = '';
                        }

                        if(nextPage === 1){
                            this.scope.firstBtnClass = 'active';
                            // 刷新数组
                            this.initPageConrtol();
                        } else if( nextPage === this.scope.maxPage ){
                            this.scope.lastBtnClass = 'active';
                            // 刷新数组
                            this.clickLastBtn();
                        } else {
                            this.scope['active'+nextPage] = 'active';
                            console.log(this.scope['active'+nextPage])
                        }
                        
                        if(nextPage === this.scope.btnArr[this.scope.btnArr.length-1]&&nextPage<this.scope.maxPage-1){
                            console.log('最后一个按钮')
                            this.changeBtnArr(1);
                            this.scope.pre = true;
                        }else if(nextPage ===  this.scope.btnArr[0]&&nextPage>2){
                            console.log('第一个按钮')
                            this.changeBtnArr(-1);
                            this.scope.next = true;
                        }

                        if(nextPage === 3){
                            this.scope.pre = false;
                        }else if(nextPage === this.scope.maxPage - 2){
                            this.scope.next = false;
                        }

                        // 当你跳转成功之后当前页就更改了
                        this.current = nextPage;
                    },
                    changeBtnArr:function(param){
                        var arr = this.scope.btnArr.concat(),
                            length = arr.length;
                        for( var i = 0 ; i<length ; i++ ){
                            arr[i] = arr[i]+param;
                        }
                        this.scope.btnArr = arr;
                    },
                    clickLastBtn:function(){
                        var arr = this.scope.btnArr.concat(),
                            length = arr.length;
                        var maxPage = this.scope.maxPage;
                        for(var i = 0 ; i<length ; i++){
                            arr[length-i-1] = maxPage - i - 1;
                        }
                        this.scope.next = false;
                        if(maxPage > 6){
                            this.scope.pre = true;
                        }
                        this.scope.btnArr = arr;
                    },
                    goPre:function(){
                        var nextPage = this.current - 1;
                        nextPage > 0 ?  this.go(nextPage)  : ''
                    },
                    goNext:function(){
                        var nextPage = this.current + 1;
                        nextPage <= this.scope.maxPage ? this.go(nextPage) : '';
                    }
                }
            }],
            controllerAs:'self',
            link: function ($scope, $element, $attribute) {

            }
        }
    }])