<script>
  import {navigateTo} from 'svero';

  import globals from '../globals';
  import {SET_ONE, SET_TWO, SET_THREE} from '../sentences/sets';
  import Facilitator from '../components/Facilitator.svelte';

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
      keyman: new Set(SET_ONE),
      firstvoices: new Set(SET_TWO),
      gboard: new Set(SET_THREE),
    });
  }
</script>

<h1> <Facilitator/> Before test: </h1>
<form on:submit={continueToInstructions}>
  <label for="partid"> Please enter your participant ID:
      <input type="number" id="partid" bind:value={participantID} required>
  </label>
  <button type="submit"> Continue </button>
  <hr>
  <button type="reset"> Clear </button>
</form>
