import svelte from 'rollup-plugin-svelte';
import resolve from 'rollup-plugin-node-resolve';
import json from 'rollup-plugin-json';

const {generateSW} = require('rollup-plugin-workbox');


export default {
  input: 'src/main.js',
  output: {
    format: 'iife',
    file: 'public/bundle.js',
  },
  plugins: [
    generateSW({
      swDest: 'public/sw.js',
      globDirectory: 'public',
    }),
    svelte(),
    json({
      preferConst: true,
      compact: true
    }),
    resolve()
  ]
}
