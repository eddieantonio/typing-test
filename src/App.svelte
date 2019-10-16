<script>
import {Router, Route} from 'svero';

import EnterParticipantID from './pages/EnterParticipantID.svelte';
import BeforeTrial from './pages/BeforeTrial.svelte';

let sentences = [
    {id: 1, name: 'tâpwe'},
    {id: 2, name: 'miyo-kîsikâw'},
];
</script>

<!-- https://github.com/kazzkiq/svero#usage -->
<main>
  <Router>
    <Route path="/" exact component={EnterParticipantID} />
    <Route path="/trial" exact component={BeforeTrial} />
    <Route path="/start-trial" exact>
      <strong> Not implemented! </strong>
    </Route>
  </Router>
</main>
