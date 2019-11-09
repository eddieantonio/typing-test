<script>
  import globals from '../globals';
  import * as navigate from '../navigate';
  import Stimulus from '../components/Stimulus.svelte';

  /**
   * Will be passed from the router.
   *
   * See: https://github.com/kazzkiq/svero#usage
   */
  export let router = {};

  /**
   * Stores the timestamp of when the input box first received focus.
   * This is when we start measuring typing speed.
   * @type Number | undefined
   */
  let firstTimeFocused = null;

  /**
   * The layout under test.
   */
  let keyboardLayout = router.params['layout'];
  console.assert(keyboardLayout === globals.layoutUnderTest, 'testing for the wrong keyboard?');

  let sentenceID = Number(router.params['sentence_id']);
  if (globals.currentSentenceID !== sentenceID) {
    console.warn(`Current page for sentence ${sentenceID} does not match
      current sentence ID ${globals.currentSentenceID}`);
  }

  /**
   * The typing buffer.
   * This will be recorded at the end of the session.
   *
   * @type string
   */
  let buffer;
  /**
   * A log of events of the following structure:
   * { event: string, data: string | null, timestamp: number }
   */
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
    globals.logTrial(events, buffer);

    // Fetch the next sentence or continue to the next layout.
    navigate.toTestCurrentLayout();
  }
</script>

<button on:click={goToNextScreen}>Done</button>
<Stimulus {sentenceID} {keyboardLayout} />
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
