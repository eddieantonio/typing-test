<script>
let keyboardLayout;
// It's a key but it's also the key, geddit?
let keykey;

const layoutTopLeftKey = {
  firstvoices: "\u1403", // ᐃ U+1403 CANADIAN SYLLABICS I
  gboard: "\u141E",      // ᐞ U+141E CANADIAN SYLLABICS GLOTTAL STOP
  keyman: "\u157D",      // ᕽ U+157D CANADIAN SYLLABICS HK
};

// TODO: redirect to home page if we don't have a paricipant ID!
console.assert(window.localStorage['currentParticipantID']);


/**
 *
 */
function nextScreen(event) {
  // TODO: verify that keykey is what we expected.
  if (layoutTopLeftKey[keyboardLayout] !== keykey) {
    alert('that is incorrect');
    event.preventDefault();
  }

  window.localStorage['layoutUnderTest'] = keyboardLayout;
}

</script>

<h1> Starting the trial: </h1>

<form action="/start-trial" on:submit={nextScreen}>
  <label for="select-layout"> Select the keyboard layout </label>
  <select id="select-layout" bind:value={keyboardLayout}>
    <!-- TODO: only display layouts we have not seen yet! -->
    <option value="firstvoices">Keyboard “F”</option>
    <option value="gboard">Keyboard “G”</option>
    <option value="keyman">Keyboard “K”</option>
  </select>

  <p> Switch to the correct keyboard layout, then answer the following
      question: </p>

  <label for="key"> What is the key at the top-left corner of this layout? </label>
  <input id="key" type="text" bind:value={keykey}>

  <button type="submit">Continue</button>
</form>
