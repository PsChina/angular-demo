
    var gulp = require('gulp');

    var browserify = require('browserify');  /*注意他不是以 gulp- 开头的包 说明他是一个node 的包 需要将node的流转成gulp的流*/ 
    
    // browserify 是获取入口文件的

    var source = require('vinyl-source-stream'); //合并js 的 

    var buffer = require('vinyl-buffer'); // 把node 的流转为 gulp的流的

    var connect = require('gulp-connect'); // 启动前端服务的

    var rev = require('gulp-rev');  //生成md5后缀的

    var collector = require('gulp-rev-collector'); //自动替换

    var watch = require('gulp-watch'); //检测文件变化的

    var webserver = require('gulp-webserver'); // 服务器

    var Mock = require('mockjs');

    var time = new Date(Mock.Random.date()).getTime();

    var fs  = require('fs');

    var data = fs.readFileSync('./data.json')
    var strData = data.toString()
    if(JSON.parse(strData)['list'].length){
        data = JSON.parse(strData);
    }else {
        data =  Mock.mock({
            'list|20':[{
                'name':'单页面应用开发',
                'score|0-100.0-2':0,
                'startTime|+86400000': time,
                'endTime|+86400000':time+1000*60*60,
                'isOpen|1':false,
                'id|+1':0
            }]
        })
        // console.log(data);
        fs.writeFileSync('./data.json',JSON.stringify(data));        
    }

    


    gulp.task('module',function(callBack){ // 定义模块化任务
        
        browserify({ //获取入口 文件
            entries:['./entry.js']
        }).bundle()  //进行打包工作
        .pipe(source('bundle.js')) //进行合并工作 给合并好的文件取一个名字
        .pipe(buffer())            //将node流转为gulp流以便将文件流交给gulp的包以后能正常工作
        .pipe(rev())               //生成md5后缀
        .pipe(gulp.dest('./dist'))     //将有md5后缀的bundle.js文件输出到同级目录
        .pipe(rev.manifest())      //生成对应关系
        .pipe(gulp.dest('./'))     //将记录对应关系的json 输出到同级目录
        .on('end',callBack);

    })

    gulp.task('reloadSrc',['module'],function(callBack){  //定义自动替换src的任务
       
            gulp.src(['./index.html','./rev-manifest.json']) /*拿到主页 和 含有对应关系的json文件*/
            .pipe(collector({ //调用自动替换的包
                replaceReved:true //开启自动替换
            }))
            .pipe(gulp.dest('./dist/'))//将替换好src 的主页输出到同级目录(httpServer根目录)
            .on('end',callBack);

    })

    gulp.task('reloadPage',['reloadSrc'],function(){ //定义自动刷新浏览器的任务
        gulp.src('.')
            .pipe(connect.reload())
    })

    gulp.task('watch',function(){ //定义监听任务
        gulp.watch(['./js/*/*.js','./js/*.js','./entry.js'],['module','reloadSrc','reloadPage']) /*当任意子模块有变化将重新运行模块化任务 和 替换src 的任务*/
        gulp.watch(['./index.html','./css/*.css','./css/*/*.css'],['reloadPage']) // 主页有更新将重新刷新浏览器
    })

    gulp.task('httpServer',function(){ //启动前端服务器i
        connect.server({
            host:'169.254.206.26',
            port:8000, //端口号为8000
            livereload:true //打开自动刷新
        })
    })

  
var url = require('url');

var qs = require('qs');


    gulp.task('MockServer',function(){
        gulp.src('.')
            .pipe(webserver({
                host:'169.254.206.26',
                port:3000,
                middleware:function(req,res,next){
                    var method = req.method,
                        urlObj = url.parse(req.url),
                        pathname = urlObj.pathname,
                        getParams = qs.parse(urlObj.query)
                    res.setHeader('Access-Control-Allow-Origin','*');
 
                    if(method === 'GET'){

                        switch(pathname){
                            case '/startexam':
                            res.setHeader('content-type','application/json;charset=utf-8');
                            res.write(JSON.stringify(data));
                            res.end();
                            break;
                        }

                    }else if (method === 'POST'){
                        var str = '';

                        req.on('data',function(chunk){
                            str+=chunk;
                        })

                        req.on('end',function(){
                            var postParams = {};
                            if( str.indexOf('{')!==-1 && str.indexOf('}')!==-1 && str.indexOf(':')!==-1 ){
                                postParams = JSON.parse(str) ;
                            } else {
                                postParams = qs.parse(str) ;
                            }

                            switch(pathname){
                                case '/deleteexam': // pai 
                         
                                for(var i = 0,len = data.list.length ; i<len  ; i++){
                                    
                                    console.log(data.list[i].id, postParams.id , typeof data.list[i].id ,typeof postParams.id)
                                    if( data.list[i].id === postParams.id ){
                                        data.list.splice(i,1);
                                        var json = JSON.stringify(data)
                                        fs.writeFileSync('./data.json',json)
                                        console.log(json);
                                        res.write(json);
                                        res.end();
                                        break;
                                    }
                                }

                                break;
                                case '/edit':

                                for(var i = 0,len = data.list.length ; i<len  ; i++){
                                    
                                    if( data.list[i].id === postParams.id ){
                                        data.list[i] = postParams.item;
                                        var json = JSON.stringify(data);
                                        fs.writeFileSync('./data.json',json)
                                        res.write(JSON.stringify(data.list[i]));
                                        res.end();
                                        break;
                                    }
                                }


                                break;
                                default :
                                res.end('404 url path not found!')
                                break;
                            }


                        })

                    }else if (method === 'OPTIONS'){
      
                        res.writeHead(200,{
                            'Access-Control-Allow-Origin':'*',
                            'content-type':'application/json;charset=utf-8',
                            'Access-Control-Allow-Methods':'PUT,DELETE,POST,GET',
                            'Access-Control-Allow-Headers':'X-requested-with, content-type, origin, accept'
                        })
                        res.end();
                    }

                }
            }))
    })


    gulp.task('default',['MockServer','httpServer','module','watch']) /*依次启动 前端服务器 模块化任务 和 监听任务*/