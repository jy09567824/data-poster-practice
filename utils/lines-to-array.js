const fs = require('fs')

module.exports = function (file) {
  const data = fs.readFileSync(file).toString()
  const lines = data.split(/\n/)
  var output = [];
  for (var i = 0; i < lines.length; i++) {
    // only push this line if it contains a non whitespace character.
    if (/\S/.test(lines[i])) {
      output.push(lines[i].trim());
    }
  }
  return output
}