import DEPOINT_TABLE from './depointed.json';
import {sentences} from './sentences';

const NNBSP = '\u202F';
const FULL_STOP = '\u166E';

/**
 * How many syllabies are in this word?
 */
export function syllablesIn(sentenceID) {
  let sentence = sentences[sentenceID];
  let words = sentence.split(/[\s᙮]+/);
  let nSyllables = words.reduce((acc, word) => acc + word.length, 0);
  return nSyllables;
}

/**
 *
 */
export function getSentenceForLayout(sentenceID, keyboardLayout) {
  let rawSentence = sentences[sentenceID];
  /* The FirstVoices keyboard does not support pointed text, so get rid of
   *those points! */
  if (keyboardLayout === 'firstvoices') {
    // TODO: this should also:
    //  - turn CwV into CV+w-dot
    //  - actually, firstvoices CAN write long vowels; just its w-dot is
    //  stupid.
    return depoint(rawSentence)
      .replace(NNBSP, '')
      .replace(FULL_STOP, '');
  }
  return rawSentence;
}


const pointed = Object.keys(DEPOINT_TABLE).join('');
const pattern = new RegExp(`[${pointed}]`, 'g')

/**
 * Makes things pallatable for the first voices keyboard.
 */
export function depoint(syllabicsString) {
  return syllabicsString.replace(pattern, (match) => {
    return DEPOINT_TABLE[match];
  });
}
