const cconf= require('cconf');
const {argv: { env = 'dev' }} = require('optimist');
const { KZConsul } = require('kz-consul');
const path = require('path');
const fs = require('fs');
const type = require('../lib/type');
const pkg = require('../package.json');

const writeConfigJson = (path, content) => {
    fs.writeFile(path, content, (err, data) => {
        if(err) throw err;
    });
};

const confMap = {
    'default': 1,
    'weixin': 1
};

const consulInit = () => {
    cconf.file(path.join(__dirname, `../deploy/env/${env}.json`));
    const consulConf = cconf.get('consul');
    consulConf.keyPrefix = `${consulConf.keyPrefix}${pkg.name}/`;
    const consulClient = new KZConsul(consulConf);
    const watcher = consulClient.openWatch();

    let opt = {};
    Object.keys(confMap).forEach((name) => {
        name  = confMap[name] === 1 ? name: confMap[name];
        consulClient.getValue(name, (err, data) => {
            if (err) throw err;
            opt[name] = {};
            if (type.is_obj(data)) {
                Object.keys(data).forEach((key) => {
                    opt[name][key] = JSON.parse(data[key]);
                });
            }

            writeConfigJson(path.join(__dirname, `../conf/${env}.json`), JSON.stringify(opt));
        });

        watcher.addWatcher(name, (err, data) => {
            if (err) throw err;
            const keyPattern = new RegExp(`^${consulConf.keyPrefix}${name}\/?`);
            const key = data.key.replace(keyPattern, '');
            opt[name][key] = data.value;
            writeConfigJson(path.join(__dirname, `../conf/${env}.json`), JSON.stringify(opt));
        });
    });
};

consulInit();
module.exports = consulInit;
