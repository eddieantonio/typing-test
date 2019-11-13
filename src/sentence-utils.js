import CWV_TO_CV from './undotted.json';
import {sentences} from './sentences';

const NNBSP = '\u202F';
const FULL_STOP = '\u166E';
const FINAL_MIDDLE_DOT = '\u1427';
const FIRSTVOICES_GREMLINS = new RegExp(`${NNBSP}|${FULL_STOP}`, 'g');
const GBOARD_GREMLINS = new RegExp(`${NNBSP}`, 'g');


/**
 * How many syllables are in this sentence?
 */
export function syllablesIn(sentenceID) {
  let sentence = sentences[sentenceID];
  let words = sentence.split(/[\s᙮]+/);
  let nSyllables = words.reduce((acc, word) => acc + word.length, 0);
  return nSyllables;
}

/**
 * Returns a sentence that can be typed on this particular keyboard.
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
    return splitWdot(rawSentence)
      .replace(FIRSTVOICES_GREMLINS, '');
  } else if (keyboardLayout === 'gboard') {
    return rawSentence.replace(GBOARD_GREMLINS, '');
  } else {
    return rawSentence;
  }
}


const pointed = Object.keys(CWV_TO_CV).join('');
const pattern = new RegExp(`[${pointed}]`, 'g')

/**
 * Splits precomposed CwV syllables into the CV syllable plus middle dot.
 *
 * This is required for the firstvoices keyboard ¯\_(ツ)_/¯
 */
export function splitWdot(syllabicsString) {
  return syllabicsString.replace(pattern, (syllable) => {
    return CWV_TO_CV[syllable] + FINAL_MIDDLE_DOT;
  });
}
