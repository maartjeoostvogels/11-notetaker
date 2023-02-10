const fs = require('fs');

const readAndAppend = (content, file) => {
    fs.readFile(file, 'utf8', (err, data) => {
      if (err) {
        console.error(err);
      } else {
        const parsedData = JSON.parse(data);
        parsedData.push(content);

        fs.writeFile(file, JSON.stringify(parsedData, null, 4), (err) =>
          err ? console.error(err) : console.info(`\nDatabase file written ${file}`)
        );
      }
    });
  };

  module.exports = { readAndAppend };