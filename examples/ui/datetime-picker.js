/*!
 * 文件描述
 * @author ydr.me
 * @create 2015-02-05 10:55
 */


define(function (require, exports, module) {
    "use strict";
    
    var DatetimePicker = require('../../src/ui/datetime-picker/');

    new DatetimePicker('#text1');
    new DatetimePicker('#text2', {
        format: 'YYYY-MM-DD HH:mm:ss',
        range: [new Date(2014, 10, 1, 8, 0, 0, 0), new Date(2015, 10, 1, 8, 0, 0, 0)]
    });
});