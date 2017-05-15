const requestService = require('./lib/RequestService');
const toQueryString = require('./lib/toQueryString');
const replaceTemplate = require('./lib/replaceTemplate');
const getUrlParams = require('./lib/getUrlParams');
const extend = require('./lib/extend');
const KZError = require('./lib/KZError');
const checkType = require('./lib/type');

const requestPools = {};
let requestGroup = 'default';
const ds = {};

/**
 * 注册数据源
 * @example
 * ds.register('passport.login', {
 *     type: 'post',
 *     url: '/passport/login',
 *     params: {
 *         name: {required: true, default_value: ''}
 *     },
 *     headers:{}
 * })
 */

ds.register = (name, config) => {
    const { type = 'get' } = config;
    let { url, headers } = config;
    requestPools[`${requestGroup}.${name}`] = (_params) => {
        if (checkType.is_obj(_params)) {
            const { qs, params, body } = _params;
            let { headers: _headers } = _params;
            if (!_headers && !qs && !params && !body) {
                url = replaceTemplate(url, _params);
                if (type === 'get' || type === 'delete') {
                    let newqs = {};
                    const urlParams = getUrlParams(url);
                    newqs = extend(urlParams, _params, true);
                    url = `${url.split('?')[0]}?${toQueryString(newqs)}`;
                    return requestService[type](url, headers);
                }
                if (type === 'post' || type === 'put') {
                    return requestService[type](url, headers, _params);
                }
            } else {
                if (checkType.is_obj(params)) {
                    url = replaceTemplate(url, params);
                }
                if (checkType.is_obj(qs)) {
                    let newqs = {};
                    const urlParams = getUrlParams(url);
                    newqs = extend(urlParams, qs, true);
                    url = `${url.split('?')[0]}?${toQueryString(newqs)}`;
                }

                headers = headers || {};
                _headers = _headers || {};
                _headers = extend(headers, _headers, true);
                return requestService[type](url, _headers, body);
            }
        }
        return requestService[type](url, headers);
    };
};

/**
 * 调用数据源
 * @example
 * ds.resolve('passport.login', {
 *     name: "example"
 * }).then(function(result) {
 *     console.log(result);
 * });
 */

ds.resolve = (name, params) => {
    if (!checkType.is_string(name) || name ==='') {
        throw new KZError(1, `function ds.resolve first param must be a string and not be empty`);
    }

    const key = `${requestGroup}.${name}`;
    if (requestPools[key]) {
        return requestPools[key](params);
    }
    throw new KZError(1, `name ${key} is not register on ds`);
};

/**
 * 设置分组
 * @param group
 * @returns {{}}
 */
ds.setGroup = (group) => {
    requestGroup = group;
    return ds;
};

/**
 * 切换分组
 * @param group
 * @returns {{}}
 */
ds.use = (group = 'default') => {
    requestGroup = group;
    return ds;
};


module.exports = ds;
