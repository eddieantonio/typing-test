#!/usr/bin/env node

/** 
 * Convert the TSV file of sentences into a JSON format that can be imported
 * by the app.
 */

const fs = require('fs');
const assert = require('assert').strict;

let [_node, _script, filename] = process.argv;
assert.ok(filename, 'must provide a filename');

let contents = fs.readFileSync(filename, 'utf8');

let [header, ...rows] = contents.split('\n');
assert.equal(header.toLowerCase(), 'sro', 'syllabics');


let sentences = [];
for (let row of rows) {
  if (row.trim() === '') {
    continue;
  }

  let [sro, syllabics] = row.split('\t')
  assert(syllabics !== undefined);
  sentences.push(syllabics);
}

let jsonified = JSON.stringify({ sentences });
process.stdout.write(jsonified + '\n');
