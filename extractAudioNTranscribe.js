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
    // Transcribe the sound that and Get the srt
    exec(`whisper-ctranslate2 ${directoryPath}${filenameWithoutExtension}.aac --language Chinese --model large-v2 --word_timestamps True --initial_prompt "我在做NodeJS教學,說的是粵語,有時會加少量英文,粵語的部份請轉為書面語,逗號的話以空隔代替,如要換行的話請確保每行字數 差不多一樣,如有隔行時請保持英文字完整盡量,謝謝" --device cuda --output_format srt -o ${directoryPath} --vad_filter True --vad_max_speech_duration_s 6`, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error executing another command: ${error}`);
        return;
      }

      console.log(`字幕 output: ${stdout}`);

      if (stderr) {
        console.error(`字幕 command error: ${stderr}`);
      }
    });
    
    console.log(`Command output: ${stdout}`);
    
    if (stderr) {
      console.error(`Command error: ${stderr}`);
    }
  })
});