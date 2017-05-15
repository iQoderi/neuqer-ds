const chai = require('chai');
const trim = require('../lib/trim');

const expect = chai.expect;

describe('trim function test', () => {
    it('should return test_test', () => {
        expect(trim(' test _ test ')).to.be.equal('test_test');
    });
});
