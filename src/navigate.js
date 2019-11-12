import {navigateTo} from 'svero';

import globals from './globals';

/**
 * The URLs here are taken from App.svelte.
 * Hence, this file is intrinsically coupled to that file.
 */

export function toSelectParticipantID() {
  navigateTo('/');
}

/**
 * Goes to the instruction page once a layout is chosen.
 */
export function toLayoutStart(layout) {
  console.assert(layout);
  navigateTo(`/layout/${layout}`);
}

/**
 * Choose a layout.
 */
export function toChooseLayout() {
  navigateTo('/layout');
}

/**
 * Done
 */
export function toEnd() {
  navigateTo('/complete');
}

/**
 * Goes to the timed practice page, so that the participant can practice the
 * current layout.
 */
export function toCurrentLayoutPractice() {
  let layout = globals.layoutUnderTest;

  if (!layout) {
    return toChooseLayout();
  }

  // TODO: implement practice page!
  //
  // For now, the practice page is not implemented, so it is skipped and we go
  // straight to the tests.
  return toTestCurrentLayout();
}

/**
 * Asks the participant to begin the test for the current keyboard.
 */
export function toTestCurrentLayout() {
  let layout = globals.layoutUnderTest;

  if (!layout) {
    navigateTo('/layout');
  }

  // TODO: something clever here.

  navigateTo(`/layout/${layout}/sentence`);
}

/**
 * Asks the participant to begin the test for the current keyboard.
 */
export function toPrimeTestSentence(sentenceID) {
  let layout = globals.layoutUnderTest;

  if (!layout) {
    navigateTo('/layout');
  }

  navigateTo(`/layout/${layout}/sentence/${sentenceID}`);
}

/**
 * Asks the participant to begin the test for the current keyboard.
 */
export function toTypeSentence(sentenceID) {
  let layout = globals.layoutUnderTest;

  if (!layout) {
    navigateTo('/layout');
  }

  navigateTo(`/layout/${layout}/sentence/${sentenceID}/type`);
}

export function toTypeCurrentSentence() {
  let sentenceID = globals.currentSentenceID;
  console.assert(sentenceID !== undefined);

  return toTypeSentence(sentenceID);
}
