<script>
import globals from '../globals';
import * as navigate from '../navigate';

import Facilitator from '../components/Facilitator.svelte';

let keyboardLayout;
// It's a key but it's also the key, geddit?
let keykey;

const layoutTopLeftKey = {
  firstvoices: "\u1403", // ᐃ U+1403 CANADIAN SYLLABICS I
  gboard: "\u141E",      // ᐞ U+141E CANADIAN SYLLABICS GLOTTAL STOP
  keyman: "\u157D",      // ᕽ U+157D CANADIAN SYLLABICS HK
};

if (!globals.currentParticipantID) {
  console.warn(`Got to ${window.location.pathname} without a participant ID!  Redirecting...`);
  /** Do this on the next tick, or else svero gets confused. */
  setTimeout(navigate.toSelectParticipantID, 0);
}

let layoutsRemaining = globals.layoutsRemaining;
let finished = layoutsRemaining.size === 0;

let layouts = Array.from(function* () {
  for (let layout of Object.keys(layoutTopLeftKey)) {
    yield {
      value: layout,
      display: `Keyboard “${layoutToCodeName(layout)}“`,
      disabled: !layoutsRemaining.has(layout)
    };
  }
}());

if (finished) {
  // If we DON'T do this on the next tick (what setTimeout(..., 0) does)
  // then both the "select keyboard" page and the complete page show up.
  setTimeout(navigate.toEnd, 0);
}


function autoAdvance() {
  if (layoutTopLeftKey[keyboardLayout] !== keykey) {
    return;
  }

  globals.layoutUnderTest = keyboardLayout;
  navigate.toLayoutStart(keyboardLayout);
}

function advanceWhenValidLayoutSelected(event) {
  event.preventDefault();

  if (layoutTopLeftKey[keyboardLayout] !== keykey) {
    alert('That is incorrect!');
    return;
  }

  globals.layoutUnderTest = keyboardLayout;
  navigate.toLayoutStart(keyboardLayout);
}

function layoutToCodeName(layoutID) {
  return layoutID[0].toUpperCase();
}

</script>

<h1><Facilitator/> Ask the faciltator setup the keyboard now </h1>

<form on:submit={advanceWhenValidLayoutSelected}>
  <label for="select-layout"> Select a keyboard layout </label>
  <select id="select-layout" bind:value={keyboardLayout}>
    {#each layouts as {value, display, disabled}}
    <option {value} {disabled}>{display}</option>
    {/each}
  </select>

  <p> Switch to the correct keyboard layout. </p>

  <label for="key"> What is the key at the top-left corner of this layout? </label>
  <input id="key" type="text" bind:value={keykey} required
    on:input={autoAdvance}
    autocomplete="off" spellcheck="false" autocorrect="off"
  >

  <button type="submit">Continue</button>
</form>
