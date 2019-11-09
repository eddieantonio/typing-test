<script>
  import {sentences} from '../sentences';
  import {depoint} from '../depoint';

  export let sentenceID;
  export let keyboardLayout;

  let sentence = (function () {
    let rawSentence = sentences[sentenceID];
    /* The FirstVoices keyboard does not support pointed text, so get rid of
     *those points! */
    if (keyboardLayout === 'firstvoices') {
      return depoint(rawSentence);
    }
    return rawSentence;
  }());

  console.assert(sentence, 'did not get a proper sentence');
</script>

<p class="the-sentence">{sentence}</p>
