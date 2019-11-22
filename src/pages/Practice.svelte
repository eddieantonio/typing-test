<script>
  import * as navigate from '../navigate';
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
  $: readyToMoveOn = buffers.every(({buffer}) => buffer.length > 0);
</script>


<h1>Practice</h1>

<p class="instructions">
Type every word <strong>exactly</strong> as it appears on the line above it.
</p>

<form on:submit|preventDefault={navigate.toAfterPractice}>
  {#each buffers as {buffer, word}}
    <p class="the-sentence">{word}</p>
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
    Done practice
  </button>
</form>
