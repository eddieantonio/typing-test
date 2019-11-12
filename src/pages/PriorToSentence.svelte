<script>
  import * as navigate from '../navigate';
  import globals from '../globals';

  let hasSelectedSentenceAlready = false;
  let hasSentencesRemaining = true;

  initialize();


  function initialize() {
    let currentSentenceID = globals.currentSentenceID;
    if (currentSentenceID !== null && currentSentenceID !== undefined) {
      hasSelectedSentenceAlready = true;
    }

    if (hasSelectedSentenceAlready) {
      // We don't need to initialize any further.
      return;
    }

    // Time to figure out what sentence to pick.
    let sentencesRemaining = globals.sentenceIDsForCurrentLayout;
    if (sentencesRemaining.size === 0) {
      // No more sentences? We shouldn't be at this page anymore!
      hasSentencesRemaining = false;
      return;
    }

    globals.currentSentenceID = choose(sentencesRemaining);
  }

  function goToNextSentence() {
    let sentenceID = globals.currentSentenceID;
    console.assert(sentenceID !== undefined);
    navigate.toPrimeTestSentence(sentenceID);
  }

  function choose(iterable) {
    let arr = Array.from(iterable);
    let i = Math.floor(Math.random() * arr.length);
    console.assert(i < arr.length && i >= 0);
    let choice = arr[i];
    console.assert(choice !== undefined);

    return choice;
  }
</script>

{#if hasSentencesRemaining}
  <h1> Type a sentence </h1>

  {#if hasSelectedSentenceAlready}
    <!-- Something weird happened, and we already tried starting this sentence,
         but we got booted back to this screen. -->
    <p class="welcome-back"> Welcome back! </p>
  {/if}

  <p> Now is a good time for a break, if you need one 💤 </p>

  <button on:click={goToNextSentence}>Start next sentence</button>
{:else}
  <h1> 🎉 You're done all of the sentences for the current layout! </h1>

  <button on:click={navigate.toChooseLayout}>
    Continue to the next layout!
  </button>
{/if}
