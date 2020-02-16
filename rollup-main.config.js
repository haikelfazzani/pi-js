import { terser } from "rollup-plugin-terser";

const config = {
  input: './main_process/main.js',
  output: {
    file: './dist/main.js',
    format: 'cjs'
  },
  plugins: [
    terser()
  ]
}

export default config;
