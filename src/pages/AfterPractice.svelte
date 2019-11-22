<script>
  import * as navigate from '../navigate';
  import Facilitator from '../components/Facilitator.svelte';
  import Stimulus from '../components/Stimulus.svelte';
  import globals from '../globals';
  import {PRACTICE_WORDS} from '../practice';
  import {adaptSentenceForLayout} from '../sentence-utils';

  /**
   * Will be passed from the router.
   *
   * See: https://github.com/kazzkiq/svero#usage
   */
  export let router = {};

  let keyboardLayout = router.params['layout'];
  console.assert(globals.layoutUnderTest === keyboardLayout);

  // Have buffers for all of these.
  let buffers = [];
  for (let word of PRACTICE_WORDS) {
    word = adaptSentenceForLayout(word, keyboardLayout);
    buffers.push({word, buffer: ''});
  }

  let readyToMoveOn = false;
  $: readyToMoveOn = buffers.some(({buffer}) => buffer.length > 0);
</script>


<h1>
  <Facilitator/> Ask the facilitator questions
</h1>

<p> Now is your chance to ask the <Facilitator/> facilitator specific
questions on <strong>how to use the keyboard</strong>. Ask the facilitator how
to write <strong>specific syllabics</strong>. </p>

<hr/>

<form on:submit|preventDefault={navigate.toTestCurrentLayout}>
  {#each buffers as {buffer, word}}
    <p
      class="the-sentence"
      class:the-sentence--correct={word === buffer}>{
      word
    }</p>
    <textarea
      class="type-syllabics type-syllabics--small"
      bind:value={buffer}
      placeholder="Tap here to type"
      autocapitalize="none"
      autocomplete="off"
      spellcheck="false"
      wrap="hard"
    />
  {/each}

  <button
    disabled={!readyToMoveOn}
    class:draw-attention={readyToMoveOn}
  >
    Done asking questions
  </button>
</form>
