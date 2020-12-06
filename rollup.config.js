import { terser } from 'rollup-plugin-terser'

export default {
  input: 'js/main.js',
  output: {
    file: 'build/bundle.js',
    format: 'iife',
    name: 'isop'
  },
  plugins: [
    terser()
  ]
}