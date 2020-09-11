const axios = require('axios').default;
const html2json = require('html2json').html2json;
var FormData = require('form-data');
var request = require('request');
const fs = require('fs');
var rimraf = require("rimraf");

const maxPages = 447;

const data = {};
rimraf("src/assets/data.json", function () { console.log("data.json deleted, beginning map."); });
getPage(1);

function getPage(i) {
  const options = {method: "POST", url: "https://www.handspeak.com/word/search/app/app-dictionary.php", headers: { "Content-Type": "multipart/form-data" }, formData : { "page" : i } };
  request(options, function (err, res, body) {
    if(err) console.log(err);
    // console.log(response.data);
    const jsonBody = html2json(body);
    const ul = jsonBody.child[1];
    ul.child.forEach((li, index) => {
      const a = li.child[0];
      const LINK = a.attr.href;
      if (a.child) {
        const TEXT = a.child[0].text;
        axios.post('https://www.handspeak.com' + LINK).then(function (response2) {
          const body2 = response2.data.match(/<video([\s\S]*?)(.*)<\/video>/g).toString();
          const jsonBody2 = html2json(body2);
          const SRC = 'https://www.handspeak.com' + jsonBody2.child[0].attr.src;
          // console.log(TEXT + ' - ' + LINK + ' - ' + SRC);
          if (!data[TEXT[0].toLowerCase()]) {
            data[TEXT[0].toLowerCase()] = [];
          }
          data[TEXT[0].toLowerCase()].push({
              text: TEXT,
              link: LINK,
              src: SRC
          });
          
          if (index + 1 === ul.child.length) {
            console.log('Mapping page ' + i + ' of ' + maxPages);
            if (i !== maxPages) {
              i = i + 1;
              getPage(i);
            } else {
              fs.appendFile('src/assets/data.json', JSON.stringify(data), function (err) {
                if (err) throw err;
                console.log('Saved!');
              });
            }
          }
        }).catch(function (error) {console.log(error);}).then();
      }
    });
  });
}
