let list = require('./lib/git-commit-list.js'),
path = require('path');

list({
    cwd: __dirname
}).then((commits) => {
    console.log(commits);
}).catch((e) => {
    console.log(e);
});
