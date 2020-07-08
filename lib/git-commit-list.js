let spawn = require('child_process').spawn;
module.exports = (opt) => {
    opt = opt || {};
    opt.count = opt.count === undefined ? 3 : opt.count;
    let spawn_options = {
        cwd: opt.cwd || process.cwd(),
    },
    git = spawn('git', ['log', '-n ' + opt.count, '--format=%H'], spawn_options);
    buf = Buffer.alloc(0);
    return new Promise((resolve, reject) => {
        git.stdout.on('data', (data) => {
            buf = Buffer.concat([buf, data])
        });
        git.stderr.on('data', (data) => {
            reject(data.toString());
        });
        git.on('close', (code) => {
            let commits = buf.toString().split('\n');
            commits.pop();
            resolve(commits);
        });
    });
};
