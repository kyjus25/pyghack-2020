const { execSync } = require("child_process");
var rimraf = require("rimraf");
var fs = require('fs');
var data = JSON.parse(fs.readFileSync('src/assets/data.json', 'utf8'));

rimraf("src/assets/videos", function () {
  console.log("videos deleted, beginning download.");

  Object.keys(data).forEach(x => {
    data[x].forEach(i => {
      const letter = i.src.split('/')[4];
      console.log(`#####################################`);
      console.log(`TRYING: ${i.src}`);
      try {
        execSync("wget -P src/assets/videos/" + letter + "/ " + i.src, (error, stdout, stderr) => {
          if (error) {
            console.log(`error: ${error.message}`);
            return;
          }
          if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
          }
          console.log(`SUCCESS: ${i.src}`);
        });
      } catch (e) {
        console.log(e);
      }
    });
  })
});

