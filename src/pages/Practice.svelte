<script>
  import * as navigate from '../navigate';
  import {PRACTICE_WORDS} from '../practice';

  /**
   * Will be passed from the router.
   *
   * See: https://github.com/kazzkiq/svero#usage
   */
  export let router = {};

  // Have buffers for all of these.
  let buffers = [];
  for (let word of PRACTICE_WORDS) {
    buffers.push({word, buffer: ''});
  }
  let keyboardLayout = router.params['layout'];

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
