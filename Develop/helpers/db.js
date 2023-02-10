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

const readAndDeleteById = (id, file) => {
    console.log(`Deleting element ${id} from file ${file}`);

    fs.readFile(file, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
        } else {
            const parsedData = JSON.parse(data);

            const filteredNotes = parsedData.filter(note => id !== note.id);

            fs.writeFile(file, JSON.stringify(filteredNotes, null, 4), (err) =>
                err ? console.error(err) : console.info(`\nDatabase file written ${file}`)
            );
        }
    });

}

module.exports = { readAndAppend, readAndDeleteById };