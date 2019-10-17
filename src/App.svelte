<script>
import {Router, Route, Link} from 'svero';

import EnterParticipantID from './pages/EnterParticipantID.svelte';
// TODO: rename this component:
import SelectKeyboardLayout from './pages/SelectKeyboardLayout.svelte';
import TypingTest from './pages/TypingTest.svelte';
</script>

<!-- https://github.com/kazzkiq/svero#usage -->
<main>
  <Router>
    <!-- Page for the researcher (i.e., me) -->
    <Route path="/" exact component={EnterParticipantID} props={{
      continueTo: '/instructions'
    }} />

    <!-- First page that participant sees -->
    <Route path="/instructions" exact props={{
      continueTo: '/layout'
    }}>
      <h1> TODO: instructions </h1>
      <Link href="/layout">Continue</Link> 
    </Route>

    <!-- The researcher then selects a layout: -->
    <Route path="/layout" exact component={SelectKeyboardLayout} />

    <!-- The researcher hands it back and the instructions screen shows up -->
    <Route path="/layout/:layout" exact>
      <h1> TODO: instructions to do timed practice </h1>
    </Route>

    <Route path="/layout/:layout/practice" exact>
      <h1> TODO: here, the participant practices for some time</h1>
    </Route>

    <Route path="/layout/:layout/sentence" exact>
      <h1> TODO: the participant is asked if they want to begin the test proper. </h1>
    </Route>

    <Route path="/layout/:layout/sentence/:sentence_id" exact>
      <h1> TODO: the participant is primed with the sentence for some time...  </h1>
    </Route>

    <!-- Then the participant is asked to type it exactly as it looks -->
    <Route path="/layout/:layout/sentence/:sentence_id/type" exact component={TypingTest} />
  </Router>
</main>
