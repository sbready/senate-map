const fs = require('fs');
const https = require('https');
const SENATE_URL = "https://www.senate.gov/general/contact_information/senators_cfm.xml";

function fetchXMLFile() {
  return new Promise((res, rej) => {
    let file = fs.createWriteStream('./data/senators.xml');
    https.get(SENATE_URL, (response) => {
      console.log("xml data load status: " + response.statusCode);
      response.pipe(file);
      file.on('finish', res);
    });
  });
}

module.exports = fetchXMLFile;
