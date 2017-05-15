const KZError = require('./KZError');

if (typeof require.ensure !== 'function') {
    require.ensure = function(dependencies, callback) {
        callback(require)
    }
}

if (typeof fetch !== 'function') {
    require.ensure(['es6-promise'], require => {
        require('isomorphic-fetch');
    }, 'fetch');
}

const TIMEOUT = 15000;
const allowedMethods = ['GET', 'POST', 'DELETE', 'PUT'];
const requestService = {
    loadedPool: {},
    waitingPool: {},
};
const response = {};

const filterResType = (res) => {
    const resType = res.headers.get('content-type').split('/')[1].split(';')[0];
    try {
        response.headers = res.headers.raw();
        switch (resType) {
            case 'json':
                return res.json();
            case 'html':
            case 'plain':
                return res.text();
            default:
                return res.json();
        }
    } catch (e) {
        throw new KZError(3, 'data format error');
    }
};

const filterStatus = (res) => {
    if (res.status < 500) {
        response.status = res.status;
        return res;
    }
    throw new KZError(0, 'request failed');
};

const responseJson = (json) => {
    response.data = json;
    return Promise.resolve(response);
};

const timeoutFetch = (ms, promise) =>
    new Promise((resolve, reject) => {
        const timer = setTimeout(() => {
            reject(new KZError(0, 'fetch time out'));
        }, ms);
        promise.then((res) => {
            clearTimeout(timer);
            resolve(res);
        }, (err) => {
            clearTimeout(timer);
            reject(err);
        }).catch((err) => {
            throw new KZError(3, err);
        });
    });

const lazyFetch = (uri, fetchOption) => (
    new Promise((resolve, reject) => {
        const key = uri;
        let pool;
        if (!requestService.loadedPool[key]) {
            pool = requestService.waitingPool[key];
            if (!pool || pool.length === 0) {
                requestService.waitingPool[key] = [];
                pool = requestService.waitingPool[key];
            }

            pool.push((err, result) => {
                if (err) return reject(err);
                return resolve(result);
            });

            requestService.loadedPool[key] = 1;

            return timeoutFetch(TIMEOUT, fetch(uri, fetchOption))
                .then(filterStatus)
                .then(filterResType)
                .then(responseJson)
                .then((json) => {
                    let callback = pool.shift();
                    while (callback) {
                        callback(null, json);
                        callback = pool.shift();
                    }

                    requestService.loadedPool[key] = null;
                })
                .catch((error) => {
                    let callback = pool.shift();
                    while (callback) {
                        callback(error);
                        callback = pool.shift();
                    }
                    requestService.loadedPool[key] = null;
                    throw error;
                });
        }

        return pool.push((err, result) => {
            if (err) return reject(err);
            return resolve(result);
        });}));

const doFetch = (uri, fetchOption) => (
    timeoutFetch(TIMEOUT, fetch(uri, fetchOption))
        .then(filterStatus)
        .then(filterResType)
        .then(responseJson)
        .catch((error) => {
            throw error;
        }));

const request = (uri, type = 'GET', headers = {}, data = '') => {
    const allowed = allowedMethods.filter(_method => _method === type);

    if (!allowed) {
        throw new KZError(2, `request method ${type} is not allowed`);
    }

    const fetchOption = {
        method: type,
        headers,
    };

    if (type === 'POST' || type === 'PUT') {
        fetchOption.body = data;
    }

    if (type === 'GET') {
        return lazyFetch(uri, type, fetchOption);
    }
    return doFetch(uri, fetchOption);
};

module.exports = request;
