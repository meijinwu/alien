/*!
 * 文件描述
 * @author ydr.me
 * @create 2015-04-22 18:05
 */


define(function (require, exports, module) {
    'use strict';

    var Scroll = require('../../src/libs/scroll.js');
    var sc = new Scroll('body');
    var sc2 = new Scroll('#demo');
    var console = window.console;

    //sc.on('left', function () {
    //    console.log('left');
    //});
    //
    //sc.on('right', function () {
    //    console.log('right');
    //});
    //
    //sc.on('top', function () {
    //    console.log('top');
    //});
    //
    //sc.on('bottom', function () {
    //    console.log('bottom');
    //});
    //
    //sc.on('y', function (ret) {
    //    //console.log(ret);
    //});
    //
    //sc.on('up', function () {
    //    console.log('up');
    //});
    //
    //sc.on('down', function () {
    //    console.log('down');
    //});
    //
    //sc2.on('left', function () {
    //    console.log(2, 'left');
    //});
    //
    //sc2.on('right', function () {
    //    console.log(2, 'right');
    //});
    //
    //sc2.on('top', function () {
    //    console.log(2, 'top');
    //});
    //
    //sc2.on('bottom', function () {
    //    console.log(2, 'bottom');
    //});

    sc2.on('visible', function () {
        console.log(2, 'visible');
    });

    sc2.on('hidden', function () {
        console.log(2, 'hidden');
    });

    sc2.on('enter', function () {
        console.log(2, 'enter');
    });

    sc2.on('leave', function () {
        console.log(2, 'leave');
    });
});