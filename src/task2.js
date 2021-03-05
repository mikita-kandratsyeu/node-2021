import csv from 'csvtojson';
import fs from 'fs';
import path from 'path';
import { pipeline } from 'stream';

const filePath = path.resolve('csv', 'input.csv');
const resultPath = path.resolve('output', 'output.txt');

pipeline(
  fs.createReadStream(filePath, { encoding: 'utf-8' }),
  csv(),
  fs.createWriteStream(resultPath),
  err => {
    if (err) {
      console.error(`Pipeline failed: `, err);
    } else {
      console.info('Pipeline succeeded!')
    }
  }
);


