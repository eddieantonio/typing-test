<script>
  import globals from '../globals';
  import * as navigate from '../navigate';
  import Stimulus from '../components/Stimulus.svelte';

  /* Prime for this long before automatically advancing. */
  const PRIMING_TIME = 15 * 1000; // in milliseconds

  /**
   * Will be passed from the router.
   *
   * See: https://github.com/kazzkiq/svero#usage
   */
  export let router = {};


  let keyboardLayout = router.params['layout'];
  console.assert(keyboardLayout === globals.layoutUnderTest, 'testing for the wrong keyboard?');

  let sentenceID = Number(router.params['sentence_id']);
  if (globals.currentSentenceID !== sentenceID) {
    console.warn(`Current page for sentence ${sentenceID} does not match
      current sentence ID ${globals.currentSentenceID}`);
  }

  /**
   * Advance to the next screen automatically.
   */
  setTimeout(function goToNextScreen() {
    // Fetch the next sentence or continue to the next layout.
    navigate.toTypeSentence(sentenceID);
  }, PRIMING_TIME);
</script>

<button disabled>Done</button>
<Stimulus {sentenceID} {keyboardLayout} />
<p class="low-key instructions">
  Read the syllabics above carefully. After a while, this text will disappear,
  and you will will be able to type this sentence.
  Type the sentence <strong>exactly</strong> as it appears.
</p>
