/**
 * Monkeypatch some things to make expressing time easier.
 */

let seconds ={
  get() {
    return this * 1000;
  },
  enumerable: false
};

let minutes = {
  get() {
    return this * 1000 * 60;
  },
  enumerable: false
};

Object.defineProperties(Number.prototype, {
  second: seconds,
  seconds: seconds,
  minute: minutes,
  minutes: minutes,
});
