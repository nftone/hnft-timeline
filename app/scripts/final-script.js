const fs = require("fs");
const path = require("path");

const  dataTimeline = path.join(__dirname, "../../data/");
const outputFile = path.join(__dirname, "../../data/", 'timeline_data.json');

function collectDataFiles(directoryPath) {
    const files = fs.readdirSync(directoryPath);

    const dataByFolder = {};

    files.forEach(file => {
        const filePath = path.join(directoryPath, file);
        const fileStat = fs.statSync(filePath);

        if (fileStat.isDirectory()) {
            const folderName = file;
            const folderPath = path.join(directoryPath, folderName);
            dataByFolder[folderName] = collectDataFiles(folderPath);
        } else if (file.endsWith('.json')) {
            const fileData = fs.readFileSync(filePath, 'utf8');
            const jsonData = JSON.parse(fileData);
            if (!dataByFolder[directoryPath]) {
                dataByFolder[directoryPath] = [];
            }
            dataByFolder[directoryPath].push(jsonData);
        }
    });

    return dataByFolder;
}

const jsonDataByFolder = collectDataFiles(dataTimeline);
console.log(jsonDataByFolder);
/*
const jsonContent = JSON.stringify(jsonDataByFolder, null, 2);
fs.writeFileSync(outputFile, jsonContent, 'utf8');*/
