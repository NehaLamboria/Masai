const fs = require('fs');
const path = require('path');

function readFileContent() {
  const filePath = path.join(__dirname, 'Data.txt');
  return fs.readFileSync(filePath, 'utf-8');
}

module.exports = readFileContent;
