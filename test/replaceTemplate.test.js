const chai = require('chai');
const replcat_template = require('../lib/replaceTemplate');

const expect = chai.expect;

describe('replace-template function test', () => {
    it('should return test_test', ()=> {
        const url ='http://www.kuaizhan.com/:id/test';
        expect(replcat_template(url,{ id: 1 })).to.be.equal('http://www.kuaizhan.com/1/test');
    });
});
