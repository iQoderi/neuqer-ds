const chai = require('chai');
const type = require('../lib/type');

const expect = chai.expect;

describe('check-type function test', () => {
    it('should return true', () => {
        expect(type.is_string('dwadawd')).to.be.ok;
        expect(type.is_obj({a:1})).to.be.ok;
        expect(type.is_number(12)).to.be.ok;
        expect(type.is_null(null)).to.be.ok;
        expect(type.is_undefined(undefined)).to.be.ok;
    });
});
