<script>
  import * as navigate from '../navigate';
  import Stimulus from '../components/Stimulus.svelte';

  const MINIMUM_PRACTICE_TIME = 0 * 60 * 1000; // milliseconds

  /**
   * Will be passed from the router.
   *
   * See: https://github.com/kazzkiq/svero#usage
   */
  export let router = {};

  let buffer = '';

  // TODO: where are we getting the practice sentence from?
  const sentenceID = 44;
  let keyboardLayout = router.params['layout'];

  let readyToMoveOn = false;

  setTimeout(() => {
    readyToMoveOn = true;
  }, MINIMUM_PRACTICE_TIME);
</script>


<button disabled={!readyToMoveOn} on:click={navigate.toAfterPractice}>
  Done practice
</button>

<Stimulus {sentenceID} {keyboardLayout} />
<textarea
  class="type-syllabics"
  bind:value={buffer}
  placeholder="Tap here and start typing"
  autocapitalize="none"
  autocomplete="off"
  spellcheck="false"
  wrap="hard"
/>
