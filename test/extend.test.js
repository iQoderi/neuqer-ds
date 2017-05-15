const chai = require('chai');
const _ = require('lodash');
const extend = require('../lib/extend');

const expect = chai.expect;

describe('extend function test', () => {
    it('should return {a:3,b:2,c:4}',()=>{
        let obj1 = {
            a:1,
            b:2
        };
        let obj2 = {
            a:3,
            c:4
        };
        expect(_.isEqual(extend(obj1,obj2,true),{a:3,b:2,c:4})).to.be.ok;
    });

    it('should return {a:1,b:2,c:4}', () => {
        let obj1 = {
            a:1,
            b:2
        };
        let obj2 = {
            a:3,
            c:4
        };
        expect(_.isEqual(extend(obj1,obj2),{a:1,b:2,c:4})).to.be.ok;
    });


});
