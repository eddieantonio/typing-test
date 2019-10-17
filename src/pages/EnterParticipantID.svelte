<script>
import globals from '../globals';

let participantID = globals.currentParticipantID;

function saveParticipantID() {
  globals.currentParticipantID = participantID;
}
</script>

<form action="/trial" on:submit={saveParticipantID}>
  <label for="partid"> Please enter your participant ID:
      <input type="number" id="partid" bind:value={participantID} required>
  </label>
  <button type="submit"> Continue </button>
  <hr>
  <button type="reset"> Clear </button>
</form>
