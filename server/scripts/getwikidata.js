const request = require('request');

function addWikiToSenator(senator) {
  let url = `https://en.wikipedia.org/w/api.php?action=opensearch&search=${senator.first_name_without_initial}_${senator.last_name}&format=json`;
  return new Promise((resolve, reject) => {
    request(url, (err, res, body) => {
      if (err) {
        reject(err);
      }
      let parsedBody = JSON.parse(body);
      let link = parsedBody[3];
      if (link.length > 0) {
        senator.wikipedia = link[0];
        resolve(senator);
      } else {
        resolve(senator);
      }
    });
  });
}

function addWikipediaToSenators(senators) {
  return Promise.all(senators.map(senator => addWikiToSenator(senator)));
}

module.exports = addWikipediaToSenators;
