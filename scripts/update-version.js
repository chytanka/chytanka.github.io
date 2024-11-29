const fs = require('fs');
const packageJson = require('../package.json');

const version = packageJson.version;

const environmentFilePaths = [
    'src/environments/environment.ts',
    'src/environments/environment.development.ts'
]

environmentFilePaths.forEach(path => update(path))

function update(environmentFilePath) {
    const filename = environmentFilePath.split('/').pop()
    let content = fs.readFileSync(environmentFilePath, 'utf8');
    const date = new Date(Date.now())
    const versionDate = `${date.getFullYear()}.${date.getMonth()+1}.${date.getDate()}`
    const V = `${version}-${versionDate}`;
    const updatedContent = content.replace(
        /version:\s*['"].*?['"]/,
        `version: "${V}"`
    );
    fs.writeFileSync(environmentFilePath, updatedContent, 'utf8');
    
    console.log('\x1b[36m%s\x1b[0m',`Updated ${filename} version to: ${V}`);
}