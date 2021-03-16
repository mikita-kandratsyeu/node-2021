import csv from 'csvtojson';
import fs from 'fs';
import path from 'path';
import { pipeline, Transform } from 'stream';

const filePath = path.resolve('csv', 'nodejs21-hw1-ex1.csv');
const resultPath = path.resolve('output', 'nodejs21-hw1-ex2.txt');

const transformLine = new Transform({ objectMode: true });
transformLine._transform = function (chunk, encoding, done) {
  const lineCsv = JSON.parse(chunk);
  const result = {};

  Object.keys(lineCsv).forEach(key => {
    if (key.toLowerCase() !== 'amount') return result[key.toLowerCase()] = lineCsv[key];
  });

  this.push(JSON.stringify(result) + '\n');

  done();
}

pipeline(
  fs.createReadStream(filePath, { encoding: 'utf-8' }),
  csv(),
  transformLine,
  fs.createWriteStream(resultPath),
  err => {
    if (err) {
      console.error('Pipeline failed: ', err);
    } else {
      console.info('Pipeline succeeded!');
    }
  }
);