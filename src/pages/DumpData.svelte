<script>
  import {localStorage2POJO} from '../dump-local-storage';

  let striginified = JSON.stringify(localStorage2POJO(), null, 2);
</script>

<pre><code>{striginified}</code></pre>
