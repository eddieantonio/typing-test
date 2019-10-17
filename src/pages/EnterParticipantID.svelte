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
    globals.currentParticipantID = participantID;
  }
</script>

<form on:submit={continueToInstructions}>
  <label for="partid"> Please enter your participant ID:
      <input type="number" id="partid" bind:value={participantID} required>
  </label>
  <button type="submit"> Continue </button>
  <hr>
  <button type="reset"> Clear </button>
</form>
