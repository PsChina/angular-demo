var rem = require('./js/base/rem');
require('./js/common/javascript');
require('./js/common/mianController');
require('./js/common/appLeftController');
require('./js/common/appRightController');
angular.bootstrap(document.documentElement, ['bootstrapApp','mainControl','app.left.control','app.right.control']) // 注入模块
rem(13.66);
