/**
 * 类型检查
 */
const getType = Object.prototype.toString;

const type = {
    is_obj(o) {
        return getType.call(o) === '[object Object]';
    },
    is_array(o) {
        return getType.call(o) === '[object Array]';
    },
    is_null(o) {
        return getType.call(o) === '[object Null]';
    },
    is_string(o) {
        return getType.call(o) === '[object String]';
    },
    is_number(o) {
        return getType.call(o) === '[object Number]';
    },
    is_undefined(o) {
        return getType.call(o) === '[object Undefined]';
    },
};

module.exports = type;
