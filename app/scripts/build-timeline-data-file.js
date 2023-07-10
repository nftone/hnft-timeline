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
  });

  return dataFilesContent;
};

buildDataFile();
