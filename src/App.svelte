<script>
  import {Router, Route, Link} from 'svero';

  import './monkeypatch-time.js';
  import * as navigate from './navigate';

  import AfterPractice from './pages/AfterPractice.svelte';
  import DumpData from './pages/DumpData.svelte';
  import EnterParticipantID from './pages/EnterParticipantID.svelte';
  import Practice from './pages/Practice.svelte';
  import PresentStimulus from './pages/PresentStimulus.svelte';
  import PriorToSentence from './pages/PriorToSentence.svelte';
  import SelectKeyboardLayout from './pages/SelectKeyboardLayout.svelte';
  import TypingTest from './pages/TypingTest.svelte';

  import Facilitator from './components/Facilitator.svelte';
</script>

<!-- https://github.com/kazzkiq/svero#usage -->
<main>
  <Router>
    <!-- Page for the facilitator (i.e., me) -->
    <Route path="/" exact component={EnterParticipantID} props={{
      continueTo: '/instructions'
    }} />

    <!-- First page that participant sees -->
    <Route path="/instructions" exact props={{
      continueTo: '/layout'
    }}>
      <h1> ᑕᑕᐚᐤ! </h1>

      <h2> Before we begin </h2>

      <p> Whenever you see the <Facilitator/> icon, this means you need to go
      call a <strong>facilitator</strong> before continuing. Either
      <strong>Eddie</strong> or <strong>Atticus</strong> will be your
      facilitator today, so make sure you go get them whenever you see the
      <Facilitator/> icon! </p>

      <h2> What you'll be doing today </h2>

      <p> You are helping us evaluate <strong> Cree syllabics keyboards </strong>
      for smartphones. We have <strong>three</strong> different keyboard
      layouts installed on this phone. You task is to use all three layouts to
      <strong>type a few sample sentences in Cree</strong>. After testing all
      three keyboards, you will be given a <strong>short
      questionnaire</strong> to fill out. </p>

      <p><strong>Important</strong>: We are not testing <em>you</em> today;
      we are testing the keyboards. We will be collecting data on how often
      typos are made; however, typos are not your fault! Typos are the
      keyboard's fault. </p>

      <h2> Consent </h2>

      <p> You should have signed the consent form by now. If not,
      <Facilitator/> go get the facilitator to give you a consent form and fill
      it out before continuing. </p>

      <p> Your participation is entirely voluntary. <strong>You may end your
      participation at anytime for any reason without penalty</strong>. Any
      data we collect from you will be immediately destroyed upon your
      withdrawal from the study. </p>

      <hr />

      <Link href="/layout">Tap here to continue</Link>
    </Route>

    <!-- The researcher then selects a layout: -->
    <Route path="/layout" exact component={SelectKeyboardLayout} />

    <!-- The researcher hands it back -->
    <!-- The participant must practice the layout for at least... some amount
         of minutes. -->
    <Route path="/layout/:layout" exact>
      <h1> Practice Mode</h1>
      <p>
        On the next screen, you will be given a sample sentence, and a box to
        type text. Use this screen to <strong>practice using keyboard</strong>.
        <strong>You will be given no instruction on how to use the current keyboard</strong>.
        The practice period will last for <strong>a few minutes</strong>.
      </p>
      <button on:click={navigate.toCurrentLayoutPractice}>Start Practice</button>
    </Route>

    <!-- The participant must practice the layout for at least... some amount
         of minutes. -->
    <Route path="/layout/:layout/practice" exact component={Practice} />

    <!-- The participant must practice the layout for at least... some amount
         of minutes. -->
    <Route path="/layout/:layout/practice/after" exact component={AfterPractice} />

    <!-- After practicing, they are prompted to begin the test proper. -->
    <Route path="/layout/:layout/sentence" exact component={PriorToSentence} />

    <!-- The sentence is primed (displayed) for some amount of time. After a
         certain amount of time, it just jumps to the next screen. -->
    <Route
      path="/layout/:layout/sentence/:sentence_id"
      exact
      component={PresentStimulus}
    />

    <!-- Then the participant is asked to type it exactly as it looks -->
    <Route path="/layout/:layout/sentence/:sentence_id/type" exact component={TypingTest} />
    <!-- At this point, the layout goes back to begin the next sentence, or
         begin the next layout. -->

    <!-- Congrats screen! -->
    <Route path="/complete" exact>
      <h1> ᑭᓇᓈᐢᑯᒥᑎᓈᐣ </h1>
      <p> You're done testing keyboards!</p>
      <p> The next part is a short questionnaire. </p>
      <p> <strong> <Facilitator/> Please call the facilitator to continue.</strong> </p>
    </Route>

    <!-- Route for me to email the data to myself ¯\_(ツ)_/¯ -->
    <Route path="/data" exact component={DumpData}></Route>

    <Route path="*">
      <h1>404</h1>
      <Link href="/" className="btn">Go to home page.</Link>
    </Route>
  </Router>
</main>
