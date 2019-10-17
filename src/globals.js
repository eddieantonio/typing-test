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
  }

  get currentParticipantID() {
    return this._currentParticipantID.get();
  }

  set currentParticipantID(value) {
    debugger;
    return this._currentParticipantID.set(value);
  }

  get layoutUnderTest() {
    return this._currentKeyboardLayout.get();
  }

  set layoutUnderTest(value) {
    console.assert(VALID_KEYBOARD_LAYOUTS.includes(value));
    return this._currentKeyboardLayout.set(value);
  }
}

const globals = new Globals;
export default globals;
