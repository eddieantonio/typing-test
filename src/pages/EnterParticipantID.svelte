<script>
let participantID = localStorage['currentParticipantID'];

function nextScreen() {
  localStorage['currentParticipantID'] = participantID;
}
</script>

<form action="/trial">
  <label for="partid"> Please enter your participant ID:
      <input type="number" id="partid" bind:value={participantID} required>
  </label>
  <button type="submit"> Continue </button>
  <hr>
  <button type="reset"> Clear </button>
</form>
