<script>
import {Router, Route} from 'svero';

import EnterParticipantID from './pages/EnterParticipantID.svelte';

let sentences = [
    {id: 1, name: 'tâpwe'},
    {id: 2, name: 'miyo-kîsikâw'},
];
</script>

<Router>
  <Route path="/" component={EnterParticipantID} />
</Router>
