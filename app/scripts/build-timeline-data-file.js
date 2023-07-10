const fs = require("fs");
const path = require("path");
const {readFile} = require("fs");

const buildDataFile = () => {
  const dataFile = {
    events: aggregateDirectoryJsonData("events"),
    projects: aggregateDirectoryJsonData("projects"),
  };

  const timeLineDataPath = path.join(
    __dirname,
    "../public/data",
    "timelineData.json"
  );

  fs.writeFileSync(timeLineDataPath, JSON.stringify(dataFile), "utf8");
};

const aggregateDirectoryJsonData = (directoryName) => {
  const dataFilesContent = [];

  const directoryPath = path.join(__dirname, "../../data/", directoryName);
  const directories = fs.readdirSync(directoryPath);

  directories.forEach((file) => {
    const subdirectoryPath = path.join(
      __dirname,
      "../../data/",
      directoryName,
      file
    );
    const fileStat = fs.statSync(subdirectoryPath);

    if (fileStat.isDirectory()) {
      const files = fs.readdirSync(subdirectoryPath);
      const dataFileName = getDataFile(files); // Récupérer le fichier JSON
      const imageFileName = getImageFile(files); // Récupérer le fichier d'image

      if (dataFileName && imageFileName) {
        const dataFilePath = path.join(subdirectoryPath, dataFileName);
        const fileData = fs.readFileSync(dataFilePath, "utf8");
        const data = { ...JSON.parse(fileData), image: imageFileName }; // Ajouter l'image au JSON
        dataFilesContent.push(data);
      }
    }
  });

  console.log(dataFilesContent)
  //return dataFilesContent;
};

const getDataFile = (files) => {
  for (const fileName of files) {
    if (fileName.endsWith('.json')){
      return fileName;
    }
  }
  return null;
};

const getImageFile = (files) => {
  for (const fileName of files) {
    if (fileName.endsWith('.jpg') || fileName.endsWith('.jpeg') || fileName.endsWith('.png') || fileName.endsWith('.gif')) {
      return fileName;
    }
  }
  return null;
}

buildDataFile();
