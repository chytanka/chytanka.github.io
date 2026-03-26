const fs = require('fs');
const path = require('path');

function printTree(dir, prefix = '') {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    const lastIndex = entries.length - 1;

    entries.forEach((entry, index) => {
        const isLast = index === lastIndex;
        const pointer = isLast ? '└─' : '├─';
        console.log(`${prefix}${pointer} ${entry.name}`);

        if (entry.isDirectory()) {
            const newPrefix = prefix + (isLast ? '   ' : '│  ');
            printTree(path.join(dir, entry.name), newPrefix);
        }
    });
}

const appDir = path.join(__dirname, '../src/app');
console.log(appDir);
printTree(appDir);