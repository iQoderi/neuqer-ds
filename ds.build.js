const ds = require('./index');
const checkType = require('./lib/type');
const requestConfig = require(`./conf/${__env__}.json`);

//使用consul中的配置
if(__useConsul__){
    Object.keys(requestConfig).forEach((group) => {
        if (checkType.is_obj(requestConfig[group])) {
            Object.keys(requestConfig[group]).forEach((name) => {
                ds.setGroup(group);
                const value = requestConfig[group][name];
                ds.register(name, value);
            });
        }
    });
}

//判断是否为浏览器环境
if (global.alert) {
    global.ds = ds;
}

module.exports = ds;