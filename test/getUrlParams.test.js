const chai = require('chai');
const _ = require('lodash');
const get_url_params = require('../lib/getUrlParams');

const expect = chai.expect;

describe('get-url-params function test', () => {
    it('should return true',() => {
        const url = 'http://www.kuaizhan.com?a=1&b=2&a=3&v=3';
        expect(_.isEqual(get_url_params(url),{a:['1','3'],b:'2',v:'3'})).to.be.ok;
    });
});
