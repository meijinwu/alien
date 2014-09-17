/*!
 * dom-attribute.js
 * @author ydr.me
 * 2014-09-16 18:30
 */


define(function (require, exports, module) {
    /**
     * @module core/dom-attribute
     */
    'use strict';

    var regHump = /-(\w)/g;
    var regSep = /^-+|-+$/g;
    var regSplit = /[A-Z]/g;
    var dataTraveller = require('../util/data-traveller.js');

    module.exports = {
        /**
         * 设置、获取元素的特征
         * @param {HTMLElement} element            元素
         * @param {String/Object/Array} [dataKey]  特征键、键值对、键数组
         * @param {String} [attrVal]               特征值
         * @returns {*}
         */
        attr: function (element, attrkey, attrVal) {
            return _getSet(arguments, {
                get: function (attrKey) {
                    return element.getAttribute(attrKey);
                },
                set: function (attrkey, attrVal) {
                    element.setAttribute(attrkey, attrVal);
                }
            });
        },
        /**
         * 设置、获取元素的属性
         * @param {HTMLElement} element            元素
         * @param {String/Object/Array} [dataKey]  属性键、键值对、键数组
         * @param {String} [propVal]               属性值
         * @returns {*}
         */
        prop: function (element, propKey, propVal) {
            return _getSet(arguments, {
                get: function (propKey) {
                    return element[propKey];
                },
                set: function (propKey, propVal) {
                    element[propKey] = propVal;
                }
            });
        },
        /**
         * 设置、获取元素的样式
         * @param {HTMLElement} element          元素
         * @param {String/Object/Array} [cssKey] 样式属性、样式键值对、样式属性数组，
         *                                       样式属性可以写成`width:after`（伪元素的width）或`width`（实际元素的width）
         * @param {String} [cssVal]              样式属性值
         * @returns {*}
         */
        css: function (element, cssKey, cssVal) {
            return _getSet(arguments, {
                get: function (cssKey) {
                    var temp = cssKey.split(':');
                    var pseudo = temp[temp.length - 1];

                    cssKey = temp[0];
                    pseudo = pseudo ? pseudo : null;
                    return getComputedStyle(element, pseudo)[_toSepString(cssKey)];
                },
                set: function (cssKey, cssVal) {
                    cssKey = cssKey.split(':')[0];
                    element.style[_toSepString(cssKey)] = cssVal;
                }
            });
        },
        /**
         * 设置、获取元素的数据集
         * @param {HTMLElement} element            元素
         * @param {String/Object/Array} [dataKey]  数据集键、键值对、键数组
         * @param {String} [dataVal]               数据集值
         * @returns {*}
         */
        data: function (element, dataKey, dataVal) {
            return _getSet(arguments, {
                get: function (dataKey) {
                    return element.dataset[_toHumpString(dataKey)];
                },
                set: function (dataKey, dataVal) {
                    if(dataTraveller.type(dataVal) === 'object'){
                        try{
                            dataVal = JSON.stringify(dataVal);
                        }catch(err){
                            dataVal = '';
                        }
                    }
                    element.dataset[_toHumpString(dataKey)] = dataVal;
                }
            });
        }
    };

    /**
     * 转换字符串为驼峰格式
     * @param {String} string    原始字符串
     * @returns {String} string  格式化后的字符串
     * @private
     */
    function _toHumpString(string) {
        return string.replace(regSep, '').replace(regHump, function ($0, $1) {
            return $1.toUpperCase();
        });
    }

    /**
     * 转换驼峰为分隔字符串
     * @param {String} string    原始字符串
     * @returns {String} string  格式化后的字符串
     * @private
     */
    function _toSepString(string) {
        return string.replace(regSep, '').replace(regSplit, function ($0) {
            return '-' + $0.toLowerCase();
        });
    }


    /**
     * get set 传输派发
     * @param {Object} args   参数类数组
     * @param {Object} getSet 传输对象
     * @returns {*}
     * @private
     */
    function _getSet(args, getSet) {
        args = [].slice.call(args, 1);
        var arg0Type = dataTraveller.type(args[0]);
        var ret = {};
        var argsLength = args.length;

        // .fn();
        if (argsLength === 0) {
            return getSet.get();
        }
        // .fn('name', '1');
        else if (argsLength === 2) {
            return getSet.set(args[0], args[1]);
        }
        // .fn({name: 1, id: 2});
        else if (argsLength === 1 && arg0Type === 'object') {
            dataTraveller.each(args[0], function (key, val) {
                getSet.set(key, val);
            });
        }
        // .fn(['name', 'id']);
        else if (argsLength === 1 && arg0Type === 'array') {
            dataTraveller.each(args[0], function (index, key) {
                ret[key] = getSet.get(key);
            });
            return ret;
        }
        // .fn('name');
        else if (argsLength === 1 && arg0Type === 'string') {
            return getSet.get(args[0]);
        }
    }
});