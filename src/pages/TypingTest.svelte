<script>
  import globals from '../globals';

  // TODO: get current sentence from... elsewhere.
  let sentence = "ᑖᐻ";
  let firstTimeFocused = null;

  // TODO: set trial from URL?
  let trial = globals.currentTrial = 1;

  let buffer;
  const events = [];

  function recordFirstTimeFocused(event) {
    let timestamp = performance.now()
    console.assert(firstTimeFocused === null);
    firstTimeFocused = timestamp;
    events.push({event: 'focus', data: null, timestamp});
  }

  function recordKeypress(event) {
    let timestamp = performance.now();
    let {data, inputType } = event;

    // firstvoices creates inputType:
    //  - "insertText"
    //  - "deleteContentBackward" when deleting
    // gboard creates inputType:
    //  - "insertCompositionText" with the entire word. Even if you delete. This is annoying.
    // keyman creates inputType:
    //  - "insertText" for finals
    //  - "insertText" for syllables, e.g., an insertText of ᐟ followed by ᐤ,
    //      followed by ᐻ
    //  - "deleteContentBackward"
    events.push({event: inputType, data, timestamp });
  }

  function goToNextScreen() {
    let timestamp = performance.now();
    events.push({event: 'done', data: null, timestamp});
    console.table(events);
    globals.logKeypresses(1, events);

    alert('Not implemented :/');
  }
</script>

<button on:click={goToNextScreen}>Done</button>
<p class="the-sentence">{sentence}</p>
<textarea
  on:input={recordKeypress}
  on:focus|once={recordFirstTimeFocused}
  class="type-syllabics"
  bind:value={buffer}
  placeholder="Tap here and start typing"
  autocapitalize="none"
  autocomplete="off"
  spellcheck="false"
  wrap="hard"
/>
