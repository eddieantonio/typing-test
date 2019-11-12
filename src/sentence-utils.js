import {sentences} from './sentences';
import {depoint} from './depoint';

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
    //  - remove periods
    //  - remove NNBSP
    //  - turn CwV into CV+w-dot
    return depoint(rawSentence);
  }
  return rawSentence;
}
