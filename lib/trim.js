const type = require('./type');
const KZError = require('./KZError');

const trim = (str) => {
    let newStr = str;
    if (type.is_number(newStr)) newStr = newStr.toString();
    if (type.is_string(newStr)) {
        return newStr.split(' ').join('');
    }
    throw new KZError(1, `type of ${str} must be String`);
};

module.exports = trim;
