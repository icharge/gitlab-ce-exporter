"use strict";

const unirest = require('unirest');

const parser = require('xml2json');

const targetXml = 'example.xml';
const targetJson = 'data.json';

function xmlFromFile(targetXml) {
  // Read file for example
  const fs = require('fs');
  const path = require('path');

  const xmlFile = fs.readFileSync(path.join(__dirname, targetXml));

  return xmlFile.toString();
}

function xmlToJson(xmlContent) {
  return parser.toJson(xmlContent, {
    object: true,
  });
}

function saveJson(fileName, jsonObj) {
  const fs = require('fs');
  const path = require('path');

  const jsonContent = JSON.stringify(jsonObj, null, 2);
  fs.writeFileSync(path.join(__dirname, fileName), jsonContent);
}

const xmlContent = xmlFromFile(targetXml);
const jsonObj = xmlToJson(xmlContent);

saveJson(targetJson, jsonObj);

