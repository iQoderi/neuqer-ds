const cconf = require('cconf');
const { KZConsul } = require('kz-consul');
const { argv: { env = 'dev', group = 'default' } } = require('optimist');
const mockData = require(`../deploy/mock/${env}.json`);
const path = require('path');
const pkg = require('../package.json');

cconf.file(path.join(__dirname, `../deploy/env/${env}.json`));
const consulConf = cconf.get('consul');
consulConf.keyPrefix = `${consulConf.keyPrefix}${pkg.name}/${group}/`;
const consulClient = new KZConsul(consulConf);

const initData = (data) => {
    Object.keys(data).forEach(async (key) => {
        await consulClient.setValue({
            key,
            value: JSON.stringify(data[key]),
            callback:(err, result) => {
                return new Promise((resolve, reject) => {
                    if (err) reject(err);
                    resolve(result);
                })
            }
        });
    });
};

initData(mockData);
