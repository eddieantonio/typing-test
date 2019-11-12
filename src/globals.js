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
    this._currentSentenceID = new LocalStorageVariable('currentSentenceID');
    this._sentencesForAllLayouts = new LocalStorageVariable('sentencesToType');
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

  get currentSentenceID() {
    let value = this._currentSentenceID.get()
    if (value === null || value === undefined) {
      return undefined;
    }

    return Number(value);
  }

  set currentSentenceID(value) {
    return this._currentSentenceID.set(value);
  }

  /**
   * Returns a set of sentences that we need to have typed in the current
   * layout.
   */
  get sentenceIDsForCurrentLayout() {
    let currentLayout = this.layoutUnderTest;
    console.assert(currentLayout);

    let sentenceIDs = this._layout2SentenceIDs;
    console.assert(currentLayout in this._layout2SentenceIDs);
    return this._layout2SentenceIDs[currentLayout];
  }

  get layoutsRemaining() {
    let layouts = new Set();
    let everythingRemaining = this._layout2SentenceIDs;

    for (let [layout, sentences] of Object.entries(everythingRemaining)) {
      if (sentences.size > 0) {
        layouts.add(layout);
      }
    }

    return layouts;
  }

  /****************************** Update state ******************************/

  /**
   * Call this prior to using sentenceIDsForCurrentLayout!!!
   */
  initializeSentences(layout2sentenceIDs) {
    console.assert(this.currentParticipantID);
    this._updateLayout2SentenceIDs(layout2sentenceIDs);
  }

  /**
   * Logs that this sentence is finished!
   *
   * This has multiple effects on the state:
   *
   * - a new, unique key is saved to the database for the events
   * - the current sentence ID is cleared
   * - the current sentence ID is marked as completed
   *
   * @param {Array} events -- the various "focus"/""keydown" events that
   *                          must be persisted
   * @param {String} buffer -- the final buffer. This is used to compare
   *                           against the expected results.
   */
  logTrial(stimulus, events, buffer) {
    console.assert(this.currentParticipantID);

    let sentenceID = globals.currentSentenceID;
    console.assert((sentenceID != undefined) && (sentenceID >= 0));

    let currentLayout = this.layoutUnderTest;
    console.assert(currentLayout);

    let layout2sentenceIDs = this._layout2SentenceIDs;
    let sentenceIDs = layout2sentenceIDs[currentLayout];
    console.assert(sentenceIDs.has(sentenceID));

    /* Log the events to a unique key. */
    let key = `${this.currentParticipantID}:${this.layoutUnderTest}:${sentenceID}`;
    let keypresses = new LocalStorageVariable(key);
    console.assert(!keypresses.get());
    keypresses.set(JSON.stringify({ stimulus, events, buffer }));

    /* Remove the sentence ID from the set: */
    sentenceIDs.delete(sentenceID);
    this._updateLayout2SentenceIDs(layout2sentenceIDs);

    this._currentSentenceID.clear();
  }

  /**
   * Tears down all state related to the current participant.
   */
  finalizeExperiment() {
    // TODO: what else needs to be cleared out?
    this._sentencesForAllLayouts.clear();
  }

  /**
   * Return a data structure:
   *
   * {
   *    "layout": Set([0, 1, 2, 3])
   * }
   */
  get _layout2SentenceIDs() {
    let layout2array = JSON.parse(this._sentencesForAllLayouts.get());
    let layout2set = {};
    for (let [layout, array] of Object.entries(layout2array)) {
      layout2set[layout] = new Set(array);
    }

    return layout2set;
  }

  _updateLayout2SentenceIDs(updatedLayout2sentenceIDs) {
    // TODO: sanity check some things.
    // case 1: current value is clear; this is a new sentence set
    //         ensure it looks right
    // case 2: we're updating the sentence
    //         the total number of IDs should decrease by exactly one.

    let asJSON = JSON.stringify(updatedLayout2sentenceIDs, (key, value) => {
      // turn the sets to arrays
      if (value instanceof Set) {
        return Array.from(value);
      }

      return value;
    });

    this. _sentencesForAllLayouts.set(asJSON);
  }
}

const globals = new Globals;
export default globals;
