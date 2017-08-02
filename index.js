"use strict";

const unirest = require('unirest');

const parser = require('xml2json');

const targetXml = 'example.xml';
const targetJson = 'data2.json';

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

function transformData(data) {
  const feed = data.feed;

  /**
   * @type {Array}
   */
  const issues = feed.entry;
  const transData = {
    title: feed.title,
    links: feed.link,
    updated: feed.updated,
    issues: issues.map((issue, index) => {
      return {
        id: '#' + issue.id.split('/').pop(),
        title: issue.title,
        updated: issue.updated,
        author: issue.author.name,
        description: issue.description,
        assignee: issue.assignee && issue.assignee.name || '',
        labels: issue.labels && issue.labels.label.join(', '),
        serverity: '',
        status: '',
      };
    }) || [],
  };

  return transData;
}

const xmlContent = xmlFromFile(targetXml);
const jsonObj = xmlToJson(xmlContent);

// saveJson(targetJson, jsonObj);
saveJson(targetJson, transformData(jsonObj));

