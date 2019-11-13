<script>
  import * as navigate from '../navigate';
  import Stimulus from '../components/Stimulus.svelte';

  const MINIMUM_PRACTICE_TIME = (1).minute;

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
  console.log(`Will wait for ${MINIMUM_PRACTICE_TIME}ms before moving on.`);
</script>


<button
  disabled={!readyToMoveOn}
  on:click={navigate.toAfterPractice}
  class:draw-attention={readyToMoveOn}
>
  Done practice
</button>

<Stimulus {sentenceID} {keyboardLayout} />
<textarea
  class="type-syllabics"
  class:type-syllabics--ready={readyToMoveOn}
  bind:value={buffer}
  placeholder="Tap here and start typing"
  autocapitalize="none"
  autocomplete="off"
  spellcheck="false"
  wrap="hard"
/>
