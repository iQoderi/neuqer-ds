const request = require('./request');

class RequestService {
    static get(uri, headers = {}) {
        return request(uri, 'GET', headers);
    }

    static post(uri, headers = { 'Content-type': 'application/x-www-form-urlencoded' }, data = '') {
        return request(uri, 'POST', headers, data);
    }

    static update(uri, headers = {}, data = '') {
        return request(uri, 'PUT', headers, data);
    }

    static remove(uri, headers = {}) {
        return request(uri, 'DELETE', headers);
    }
}

module.exports = RequestService;
