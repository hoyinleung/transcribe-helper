const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const fileNames = process.argv.slice(2);

// Print the file names
fileNames.forEach(fileName => {

  const isValidPath = fs.existsSync(fileName);
  if(!isValidPath) 
  {
    //console.log(`${fileName} is not a valid path`)
    return
  }

  console.log(`正處理${fileName}`);

  // Extract the directory path
  let directoryPath = path.dirname(fileName);
  //console.log('Directory Path:', directoryPath);

  // add trailing slash if not available
  if (!directoryPath.endsWith(path.sep)) {
    directoryPath += path.sep;
  }

  // Extract the filename without extension
  const filenameWithoutExtension = path.basename(fileName, path.extname(fileName));
  //console.log('Filename without Extension:', filenameWithoutExtension);


  //exec(`ffmpeg -i '01.mp4' -vn -c:a aac -b:a 72k output.aac`, 
  exec(`ffmpeg -i ${fileName} -vn -c:a aac -b:a 128k ${directoryPath}${filenameWithoutExtension}.aac`, 
    (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing command: ${error}`);
      return;
    } 
    console.log(`Command output: ${stdout}`);
    
    if (stderr) {
      console.error(`Command error: ${stderr}`);
    }
  })
});

