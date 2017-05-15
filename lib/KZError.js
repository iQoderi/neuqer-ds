/**
 * 重载Error对象 code异常对应错误码 message:
 * @param code
 * @param message
 * @private
 */
function KZError(code = 4, message = '') {
    this.code = code;
    this.message = message;
}

KZError.prototype = Error.prototype;

module.exports = KZError;
