#!/usr/bin/env node

/**
 * Convert the TSV file of sentences into a JSON format that can be imported
 * by the app.
 */

const fs = require('fs');
const assert = require('assert').strict;

const {sro2syllabics} = require('cree-sro-syllabics');

const ALLOWABLE_CHARACTERS = /^[\u0020!"\u202F\u1400-\u1680]$/;

//////////////////////////////////// MAIN ////////////////////////////////////

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
  sro = sro.trim();

  syllabics = sro2syllabics(sro);
  ensureOnlyAllowableCharacters(syllabics);

  sentences.push(syllabics);
}

let jsonified = JSON.stringify({ sentences });
fs.writeFileSync(outName, jsonified + '\n', 'utf8');


////////////////////////////////// HELPERS ///////////////////////////////////

function ensureOnlyAllowableCharacters(text) {
  for (let ch of text) {
    if (!ALLOWABLE_CHARACTERS.exec(ch)) {
      throw new Error(`unallowable character ${ch} in: ${text}`);
    }
  }
}
