/**
 * Defines a bunch of globals. Yes, globals bad, I know.
 */

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
 * Makes it convenient to get and set globals.
 */
export class Globals {
  constructor() {
    this._currentParticipantID = new LocalStorageVariable('currentParticipantID');
    this._currentKeyboardLayout = new LocalStorageVariable('currentKeyboardLayout');
  }

  get currentParticipantID() {
    return this._currentParticipantID.get();
  }

  set currentParticipantID(value) {
    debugger;
    return this._currentParticipantID.set(value);
  }

  get currentKeyboardLayout() {
    return this._currentKeyboardLayout.get();
  }

  set currentKeyboardLayout(value) {
    console.assert(['gboard', 'keyman', 'firstvoices'].include(value));
    return this._currentKeyboardLayout.set(value);
  }
}

const globals = new Globals;
export default globals;
