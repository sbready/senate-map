const fs = require('fs');
const http = require('https');
const parseString = require('xml2js').parseString;
const format = require('./scripts/format');
const fetchXMLFile = require('./scripts/loadxml');
const getwikidata = require('./scripts/getwikidata');

// 1. Fetch XML from senate.gov
// 2. Convert/format data
// 3. Output JSON
fetchXMLFile().then(() => {
  fs.readFile('./data/senators.xml', (err, xml) => {
    parseString(xml, (err, result) => {
      let members = result.contact_information.member;
      let cleanedMembers = format.cleanUpMemberList(members);
  
      getwikidata(cleanedMembers)
        .then(senators => format.keyByState(senators))
        .then(senatorsByState => JSON.stringify(senatorsByState))
        .then(json => {
          console.log('created senators_with_wiki.json');
          fs.writeFileSync('./data/senators.json', json)
          fs.writeFileSync('../src/data/states.json', json)
        })
        .catch(err => console.log(err));
    });
  });
});
