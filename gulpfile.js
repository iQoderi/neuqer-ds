const gulp = require('gulp');
const runSequence = require('run-sequence');
const { exec } = require('child_process');
const path = require('path');
const { argv: { env = 'dev'}} = require('optimist');
const fs = require('fs');
const consulInit = require('./init/consul');

const destDir = 'dist';
const confFile = `./conf/${env}.json`;

//clean
gulp.task('clean', () => {
    exec(`rm -rf ${destDir}`);
});

//get request config
gulp.task('get:config', (cb) => {
    exec(consulInit(), (error, stdout, stderr) => {
        if (error) {
            console.log(stderr);
            return cb(error);
        }
        console.log(stdout);
        cb(null);
    });
});

//build
gulp.task('build', (cb) => {
    try {
        fs.readFileSync(confFile);
        exec(`CLIENT=browser webpack`)
    } catch(err){
        throw new Error('you should get request config first(run gulp get:config)')
    }
});

//default
gulp.task('default',(callback) => {
    runSequence(
        'clean',
        'build',
        (err) => {
            if (err) console.error(err);
            callback(err);
        }
    );
});