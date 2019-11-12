<script>
  import {navigateTo} from 'svero';

  import globals from '../globals';

  // Props that come from the router.
  export let router;
  export let continueTo;

  let participantID = globals.currentParticipantID;

  console.assert(continueTo, 'expected a url to continue to but got nothing');

  function continueToInstructions(event) {
    event.preventDefault();
    saveParticipantID();
    navigateTo(continueTo);
  }

  function saveParticipantID() {
    console.assert(!globals.currentParticipantID);
    globals.currentParticipantID = participantID;
    globals.initializeSentences({
      keyman: new Set([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]),
      firstvoices: new Set([10, 11, 12, 13, 14, 15, 16, 17, 18, 19]),
      gboard: new Set([20, 21, 22, 23, 24, 25, 26, 27, 28, 29]),
    });
  }
</script>

<h1> 👨🏽‍🔬 Before test: </h1>
<form on:submit={continueToInstructions}>
  <label for="partid"> Please enter your participant ID:
      <input type="number" id="partid" bind:value={participantID} required>
  </label>
  <button type="submit"> Continue </button>
  <hr>
  <button type="reset"> Clear </button>
</form>
