<script>
  // TODO: get current sentence from... elsewhere.
  let sentence = "ᑖᐻ";
  let buffer;
  let lastEvent;

  function recordKeypress(event) {
    let {data, inputType } = event;
    lastEvent = JSON.stringify({event: inputType, char: data, timestamp: null }, null, 2);
    console.log({event});
  }
</script>

<p class="the-sentence">{sentence}</p>
<textarea
  on:input={recordKeypress}
  class="type-syllabics"
  bind:value={buffer}
  placeholder="Tap here and start typing"
  autocapitalize="none"
  autocomplete="off"
  spellcheck="false"
  wrap="hard"
/>

<pre style="white-space: pre-line;">{lastEvent}</pre>
