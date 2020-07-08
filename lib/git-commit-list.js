let spawn = require('child_process').spawn;

module.exports = (opt) => {
    opt = opt || {};
    let spawn_options = {
        cwd: opt.cwd || process.cwd()
    },
    git = spawn('git', ['log', '--format=%s:c-%H'], spawn_options);
    buf = Buffer.alloc(0);

    git.stdout.on('data', (data) => {
        buf = Buffer.concat([buf, data])
    });
    git.stderr.on('data', (data) => {
        console.log(data.toString());
    });

    git.on('close', (code) => {
        console.log(buf.toString());
    });

};
