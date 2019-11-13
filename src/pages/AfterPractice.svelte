<script>
  import * as navigate from '../navigate';
  import Stimulus from '../components/Stimulus.svelte';
  import Facilitator from '../components/Facilitator.svelte';

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
</script>


<h1>
  <Facilitator/> Ask the facilitator questions
</h1>

<p> Now is your chance to ask the <Facilitator/> facilitator specific
questions on how to use the keyboard. </p>

<button
  disabled={buffer.length === 0}
  on:click={navigate.toTestCurrentLayout}>
  Ready
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
