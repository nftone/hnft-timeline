const fs = require("fs");
const path = require("path");

// @TODO: Clean this file
const buildDataFile = () => {
  const dataFile = {
    events: aggregateDirectoryJsonData("events"),
    projects: aggregateDirectoryJsonData("projects"),
    taxonomy: buildTaxonomy()
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

        const jsonData = JSON.parse(fileData);
        const slug = jsonData.slug; // Récupère la valeur du champ "slug" dans le fichier JSON
        const imageExtension = path.extname(imageFileName); // Obtient l'extension de l'image
        const image = `${slug}${imageExtension}`;

        const imageSrcPath = path.join(subdirectoryPath, imageFileName);
        const imagePath = path.join(
          __dirname,
          "../../app/public/images/",
          directoryName,
          image
        );

        fs.copyFileSync(imageSrcPath, imagePath);

        const data = { ...jsonData, image };
        dataFilesContent.push(data);
      }
    }
  });

  return dataFilesContent;
};

const buildTaxonomy = () => {
  const imagesDirectoryPath = path.join(__dirname, "../../data/taxonomy/images")
  const imagesDirectory = fs.readdirSync(imagesDirectoryPath);
  imagesDirectory.forEach((file) => {
    const imagePath = path.join(
      __dirname,
      "../../app/public/images/taxonomy/",
      file
    );
        const imageSrcPath = path.join(imagesDirectoryPath, file);

    fs.copyFileSync(imageSrcPath, imagePath);
  })

  const taxonomyData = fs.readFileSync(
    path.join(__dirname, "../../data/taxonomy/taxonomy.json"),
    "utf8"
  );

  return JSON.parse(taxonomyData);
}


const getDataFile = (files) => {
  for (const fileName of files) {
    if (fileName.endsWith(".json")) {
      return fileName;
    }
  }
  return null;
};

const getImageFile = (files) => {
  for (const fileName of files) {
    if (
      fileName.endsWith(".jpg") ||
      fileName.endsWith(".jpeg") ||
      fileName.endsWith(".png") ||
      fileName.endsWith(".gif")
    ) {
      return fileName;
    }
  }
  return null;
};

buildDataFile();
