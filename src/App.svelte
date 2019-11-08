<script>
  import {Router, Route, Link} from 'svero';

  import * as navigate from './navigate';
  import EnterParticipantID from './pages/EnterParticipantID.svelte';
  import SelectKeyboardLayout from './pages/SelectKeyboardLayout.svelte';
  import TypingTest from './pages/TypingTest.svelte';
  import DumpData from './pages/DumpData.svelte';
  import PriorToSentence from './pages/PriorToSentence.svelte';
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

    <!-- The researcher hands it back -->
    <!-- The participant must practice the layout for at least... some amount
         of minutes. -->
    <Route path="/layout/:layout" exact>
      <h1> TODO: instructions to do timed practice </h1>
      <button on:click={navigate.toCurrentLayoutPractice}>Practice</button>
    </Route>

    <!-- The participant must practice the layout for at least... some amount
         of minutes. -->
    <Route path="/layout/:layout/practice" exact>
      <h1> TODO: here, the participant practices for some time</h1>
      <button on:click={navigate.toTestCurrentLayout}>Done practice</button>
    </Route>

    <!-- After practicing, they are prompted to begin the test proper. -->
    <Route path="/layout/:layout/sentence" exact component={PriorToSentence} />

    <!-- The sentence is primed (displayed) for some amount of time. After a
         certain amount of time, it just jumps to the next screen. -->
    <Route path="/layout/:layout/sentence/:sentence_id" exact>
      <h1> TODO: the participant is primed with the sentence for some time...  </h1>
      <p> After some time, the opportunity to type just appears! </p>
      <button on:click={navigate.toTypeCurrentSentence}>Start typing... </button>
    </Route>

    <!-- Then the participant is asked to type it exactly as it looks -->
    <Route path="/layout/:layout/sentence/:sentence_id/type" exact component={TypingTest} />
    <!-- At this point, the layout goes back to begin the next sentence, or
         begin the next layout. -->

    <!-- Congrats screen! -->
    <Route path="/complete" exact>
      <h1> ᑭᓇᓈᐢᑯᒥᑎᓈᐣ </h1>
      <p> You're done this part of the session!</p>
      <p> The next part is a short questionaire. </p>
      <p> <strong> Please call the facilitator to continue.</strong> </p>
    </Route>

    <!-- Route for me to email the data to myself ¯\_(ツ)_/¯ -->
    <Route path="/data" exact component={DumpData}></Route>

    <Route path="*">
      <h1>404</h1>
      <Link href="/" className="btn">Go to home page.</Link>
    </Route>
  </Router>
</main>
