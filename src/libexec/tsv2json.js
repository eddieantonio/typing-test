#!/usr/bin/env node

/**
 * Convert the TSV file of sentences into a JSON format that can be imported
 * by the app.
 */

const fs = require('fs');
const assert = require('assert').strict;

let [_node, _script, filename, outName] = process.argv;
assert.ok(filename, 'must provide a filename');
assert.ok(outName, 'must provide a destination');

let contents = fs.readFileSync(filename, 'utf8');

let [header, ...rows] = contents.split('\n');
assert.equal(header.toLowerCase(), 'sro\tsyllabics');


// The two nulls make the indices EQUAL to the line number in the file.
//  (first null for the header, second null to make it 1-indexed).
// This will make a confusing JSON file, but will make it easier to compare
// indices between the source file and the resultant JSON.
let sentences = [null, null];
for (let row of rows) {
  row = row.trim();

  // skip empty lines and comments
  if (row === '' || row.startsWith('#')) {
    sentences.push(null)
    continue;
  }

  let [sro, syllabics] = row.split('\t')
  assert(syllabics !== undefined, row);
  sro = sro.trim();
  syllabics = syllabics.trim();

  sentences.push(syllabics);
}

let jsonified = JSON.stringify({ sentences });
fs.writeFileSync(outName, jsonified + '\n', 'utf8');
