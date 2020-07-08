let spawn = require('child_process').spawn;
module.exports = (opt) => {
    opt = opt || {};

    if (opt.commits === undefined) {
        return Promise.reject('must give commit list');
    }
    let len = opt.commits.length;
    opt.firstIndex = opt.firstIndex === undefined ? len - 1 : opt.firstIndex;
    opt.lastIndex = opt.lastIndex === undefined ? 0 : opt.lastIndex;

    let spawn_options = {
        cwd: opt.cwd || process.cwd(),
    },
    git = spawn('git', ['diff', opt.commits[opt.firstIndex], opt.commits[opt.lastIndex], '--name-only'], spawn_options);
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
