<script>
  import {getSentenceForLayout} from '../sentence-utils';

  export let sentenceID;
  export let keyboardLayout;

  let sentence = getSentenceForLayout(sentenceID, keyboardLayout);
  console.assert(sentence, 'did not get a proper sentence');
</script>

<p class="the-sentence">{sentence}</p>
