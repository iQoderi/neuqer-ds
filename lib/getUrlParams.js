/**
 * 解析url里面的query string 和 config qs参数合并
 * @param url
 * @returns {{}}
 */
const type = require('./type');

const getUrlParams = (url) => {
    const ret = {};
    const seg = url.split('?')[1];
    if (seg) {
        const segArr = seg.split('&');
        let s;
        for (let i = 0; i < segArr.length; i += 1) {
            s = segArr[i].split('=');
            if (s[0] in ret) {
                if (type.is_array(ret[s[0]])) {
                    ret[s[0]].push(s[1]);
                } else {
                    ret[s[0]] = [ret[s[0]], s[1]];
                }
            } else {
                ret[s[0]] = s[1];
            }
        }
    }

    return ret;
};

module.exports = getUrlParams;
