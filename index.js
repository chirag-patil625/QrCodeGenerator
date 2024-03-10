import inquirer from 'inquirer';
import { writeFile } from 'fs';
import qr from 'qr-image';
import fs from 'fs';

inquirer
 .prompt([
   { type: 'input',
    name:"URL",
    message:"Enter your URL:"
   }
  ])
  .then((answers) => {
    const Input = answers.URL;
    writeFile("SavedURL.txt", Input, (err) => {
           if (err){
            console.log("Can't Save the file");
            return;
           }
           console.log("File saved");

           var qr_svg = qr.image(Input);
           qr_svg.pipe(fs.createWriteStream('QR.png'));
          });
  })
  .catch((error) => {
    if (error.isTtyError) {
      console.error("Prompt couldn't be rendered in the current environment");
    } else {
      console.error('Something else went wrong:', error);
    }
  });