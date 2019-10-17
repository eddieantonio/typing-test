/**
 * Defines a bunch of globals. Yes, globals bad, I know.
 */

const VALID_KEYBOARD_LAYOUTS = ['gboard', 'keyman', 'firstvoices'];

/**
 * A single variable that is persisted to LocalStorage.
 */
export class LocalStorageVariable {
  constructor(key) {
    if (!key) {
      throw new Error('Undefined key');
    }

    this.key = key;
  }

  set(value) {
    return window.localStorage.setItem(this.key, value);
  }

  get() {
    return window.localStorage.getItem(this.key);
  }

  clear() {
    return window.localStorage.removeItem(this.key);
  }
}


/**
 * Make it convenient to get and set globals.
 */
export class Globals {
  constructor() {
    this._currentParticipantID = new LocalStorageVariable('currentParticipantID');
    this._currentKeyboardLayout = new LocalStorageVariable('layoutUnderTest');
    this._currentTrial = new LocalStorageVariable('currentTrial ');
  }

  get currentParticipantID() {
    return this._currentParticipantID.get();
  }

  set currentParticipantID(value) {
    return this._currentParticipantID.set(value);
  }

  get layoutUnderTest() {
    return this._currentKeyboardLayout.get();
  }

  set layoutUnderTest(value) {
    console.assert(VALID_KEYBOARD_LAYOUTS.includes(value));
    return this._currentKeyboardLayout.set(value);
  }

  get currentTrial() {
    return Number(this._currentTrial.get());
  }

  set currentTrial(value) {
    return this._currentTrial.set(value);
  }

  logKeypresses(trial, events) {
    console.assert(trial >= 0);
    console.assert(this.currentParticipantID);
    console.assert(this.layoutUnderTest);

    let key = `${this.currentParticipantID}:${this.layoutUnderTest}:${trial}`;
    let keypresses = new LocalStorageVariable(key);
    keypresses.set(JSON.stringify(events));
  }
}

const globals = new Globals;
export default globals;
