let list = require('./lib/git-commit-list.js'),
diff = require('./lib/git-commit-list-diff'),
path = require('path');

list({
    cwd: __dirname,
    count: 10
}).then((commits) => {
    return diff({
        commits: commits
    });
}).then((out) => {
    console.log(out);
}).catch((e) => {
    console.log(e);
});
