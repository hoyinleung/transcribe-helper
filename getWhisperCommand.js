const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const fileNames = process.argv.slice(2);
const whatIAmDoing = `NodeJS教學`
const initalPrompt = `我在做${whatIAmDoing},說的是粵語,有時會加少量英文,粵語的部份請轉為書面語,逗號的話以空隔代替,如要換行的話請確保每行字數差不多一樣,如有隔行時請保持英文字完整盡量,謝謝`
const maxLineCount = 1
const maxLineChar = 20

// Print the file names
fileNames.forEach(fileName => {

  const isValidPath = fs.existsSync(fileName);
  if(!isValidPath) 
  {
    //console.log(`${fileName} is not a valid path`)
    return
  }

  //console.log(`processing...${fileName}`);

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

  //const maxLineCharCmd =  (maxLineChar )? `--max_line_width ${maxLineChar}` : ``
  //const maxLineCountCmd =  (maxLineCount )? `--max_line_count ${maxLineCount}` : ``

  console.log(`!whisper-ctranslate2 ${filenameWithoutExtension}.aac --language Chinese --model large-v2 --word_timestamps True --initial_prompt "${initalPrompt}" --device cuda --output_format srt`)
});
