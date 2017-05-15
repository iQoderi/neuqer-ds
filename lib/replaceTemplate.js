/**
 *
 * @param oStr {{example: 'http://www.kuaizhan.com/add/:id/test'}}
 * @param opt
 */
const type = require('./type');
const trim = require('./trim');
const KZError = require('./KZError');

const replaceTemplate = (str, opt) => {
    let oStr = str;
    const oOpt = opt;
    if (type.is_obj(oOpt)) {
        if (type.is_string(oStr)) {
            const protocolPattern = /https?/;
            const tplPattern = /:{1}[\w\b]+\/?/g;
            const charPattern = /:{1}|\/{1}/g;
            let protocol = '';
            let qs = '';
            let prev = '';
            const matches = oStr.match(protocolPattern);
            const strArr = oStr.split('?');

            oStr = trim(oStr);
            oStr = strArr[0];
            qs = strArr[1];

            if (matches && matches.index === 0) {
                protocol = matches[0];
                oStr = oStr.replace(`${protocol}://`, '');
            }
            oStr = oStr.replace(tplPattern, (s) => {
                let v = s;
                prev = trim(v).replace(charPattern, '');
                v = oOpt[prev];
                if (type.is_undefined(v)) {
                    throw new KZError(1, `${oStr} need params ${prev},but got undefined`);
                } else {
                    delete oOpt[prev];
                    return `${trim(v)}/`;
                }
            });

            if (qs) {
                oStr = `${oStr}?${qs}`;
            }

            if (protocol !== '') {
                oStr = `${protocol}://${oStr}`;
            }

            return oStr;
        }

        throw new KZError(1, 'function replaceTemplate`s 1th argument must be a String');
    } else {
        throw new KZError(1, 'function replaceTemplate`s 2th argument must be a Object');
    }
};

module.exports = replaceTemplate;
