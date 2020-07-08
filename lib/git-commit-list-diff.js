let spawn = require('child_process').spawn;
module.exports = (opt) => {
    opt = opt || {};

    if (opt.commits === undefined) {
        return Promise.reject('must give commit list');
    }

    let spawn_options = {
        cwd: opt.cwd || process.cwd(),
    },
    len = opt.commits.length,
    git = spawn('git', ['diff', opt.commits[len], opt.commits[0], '--name-only'], spawn_options);
    buf = Buffer.alloc(0);
    return new Promise((resolve, reject) => {
        git.stdout.on('data', (data) => {
            buf = Buffer.concat([buf, data])
        });
        git.stderr.on('data', (data) => {
            reject(data.toString());
        });
        git.on('close', (code) => {
            let out = buf.toString();
            resolve(out);
        });
    });
};
