import svelte from 'rollup-plugin-svelte';
import resolve from 'rollup-plugin-node-resolve';

export default {
  input: 'src/main.js',
  output: {
    format: 'iife',
    file: 'public/bundle.js',
  },
  plugins: [
    svelte({
      include: 'src/**/*.svelte',
    }),
    resolve()
  ]
}
