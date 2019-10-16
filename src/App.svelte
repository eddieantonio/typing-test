<script>
let participantID = localStorage['currentParticipantID'];

function nextScreen(event) {
  event.preventDefault();
  localStorage['currentParticipantID'] = participantID;
}
</script>

<form on:submit={nextScreen}>
  <label for="partid"> Please enter your participant ID:
      <input type="number" id="partid" name="participantID" bind:value={participantID} required>
  </label>
  <button type="submit"> Continue </button>
  <hr>
  <button type="reset"> Clear </button>
</form>
