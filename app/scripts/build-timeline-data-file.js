const fs = require("fs");
const path = require("path");

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

    fs.readdirSync(subdirectoryPath).forEach((fileName) => {
      if (!fileName.endsWith(".json")) return;
      const filePath = path.join(subdirectoryPath, fileName);
      const fileData = fs.readFileSync(filePath, "utf8");
      dataFilesContent.push(JSON.parse(fileData));
    });

    // TODO: implementer

    // const files = fs.readdirSync(subdirectoryPath)
    // const dataFile = getDataFile(files) // Recuperer JSON
    // const imageFile = getImageFile(files) // Recuperer image
    // const data = { ...dataFile, image: imageFile } // Ajouter image au JSON
    // dataFilesContent.push(data)
  });

  return dataFilesContent;
};

buildDataFile();
