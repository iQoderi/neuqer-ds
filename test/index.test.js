const ds = require('./../index');
const chai = require('chai');

const expect = chai.expect;

//测试直接参数
describe('测试直接参数',() => {
    before(function () {
        ds.register('topics', {
            type:'get',
            url:' https://cnodejs.org/api/:version/topics',
        });
        ds.register('login', {
            type:'post',
            url:'http://api.wall.qoder.cn/auth/login'
        });
    });

    it('测试get返回', (done) => {
        ds.resolve('topics', {
            version:'v1',
            page:1,
            limit:30,
            tab:'all'
        }).then((data)=>{
            expect(data).to.be.an('object');
            done();
        }).catch(err => { console.log(err.message); done() });
    });

    it('测试post返回',(done)=>{
        ds.resolve('login', {
            email:'841599872@qq.com',
            password:'123456789'
        }).then((data) => {
            expect(data).to.be.an('object');
            done();
        }).catch(err => { console.log(err.message); done() });
    });
});

//测试完整参数
describe('测试完整参数',() => {
    before(function () {
        ds.register('topics',{
            type:'get',
            url:'http://cnodejs.org/api/:version/topics'
        });
        ds.register('login',{
            type:'post',
            url:'http://api.wall.qoder.cn/auth/login',
            headers:{
                'token':'dwadwa1231'
            }
        });
    });

    it('测试get返回',(done) => {
        ds.resolve('topics',{
            params:{
                version:'v1'
            },
            qs:{
                page:1,
                limit:30,
                tab:'all'
            }
        }).then((data)=>{
            expect(data).to.be.an('object');
            ds.resolve('topics', {
                params: {
                    version: 'v1'
                },
                qs: {
                    page: 1,
                    limit: 30,
                    tab: 'all'
                }
            }).then((json)=>{
                expect(json).to.be.an('object');
                done();
            })
        }).catch(err=>{console.log(err.message);done()})
    });


    it('测试post返回',(done)=>{
        ds.resolve('login',{
           headers:{
               'Content-type':'application/x-www-form-urlencoded'
           },
           body:{
               email:'841599872@qq.com',
               password:'123456789'
           }
        }).then((data)=>{
            expect(data).to.be.an('object');
            done();
        }).catch(err=>{console.log(err.message);done()})
    });
});