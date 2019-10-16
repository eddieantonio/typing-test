<script>
  // TODO: get current sentence from... elsewhere.
  let sentence = "ᑖᐻ";
  let buffer;
  let lastEvent;

  let firstTimeFocused;

  function recordFirstTimeFocused(event) {
    let timestamp = performance.now()
    console.assert(firstTimeFocused === undefined);
    firstTimeFocused = timestamp;
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

    lastEvent = JSON.stringify({event: inputType, char: data, timestamp }, null, 2);
    console.log({event});
  }
</script>

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

<pre style="white-space: pre-line;">{lastEvent}</pre>
<output>{firstTimeFocused}</output>
