const path = require('path');

const nextPath = path.join(__dirname, 'node_modules', 'next/dist/bin/next');

process.argv.length = 1;
process.argv.push(nextPath, 'start');

// eslint-disable-next-line import/no-dynamic-require
require(nextPath);
