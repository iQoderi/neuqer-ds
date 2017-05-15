const chai = require('chai');
const to_query_string = require('../lib/toQueryString');

const expect = chai.expect;

describe('to-query-string function test', () => {
    it('should return a=1&b=1&b=2&b=3&c=4', () => {
        const qs = {
            a:1,
            b:[3,2,1],
            c:4
        };
        expect(to_query_string(qs)).to.be.equal('a=1&b=1&b=2&b=3&c=4');
    });
});
