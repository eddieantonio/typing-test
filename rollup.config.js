import svelte from 'rollup-plugin-svelte';
import resolve from 'rollup-plugin-node-resolve';
import json from 'rollup-plugin-json';

export default {
  input: 'src/main.js',
  output: {
    format: 'iife',
    file: 'public/bundle.js',
  },
  plugins: [
    svelte(),
    json({
      preferConst: true,
      compact: true
    }),
    resolve()
  ]
}
