// These numbers correspond to line numbers in trials.tsv.
// Make sure they sync up!
export const SET_ONE = irange(3, 29);
export const SET_TWO = irange(32, 58);
export const SET_THREE = irange(61, 87);


function irange(start, end) {
  let a = [];
  for (let i = start; i <= end; i++) {
    a.push(i);
  }

  return a;
}
