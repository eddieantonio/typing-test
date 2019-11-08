import DEPOINT_TABLE from './depointed.json';

let pointed = Object.keys(DEPOINT_TABLE).join('');
let pattern = new RegExp(`[${pointed}]`, 'g')

export function depoint(syllabicsString) {
  debugger;
  return syllabicsString.replace(pattern, (match) => {
    return DEPOINT_TABLE[match];
  });
}
