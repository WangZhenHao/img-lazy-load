import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';

export default {
  input: 'src/index.js',
  output: {
    name: 'img-lazy-load',
    file: 'dist/img-lazy-load.js',
    format: 'umd'
  },
  watch: {
    inlude: 'src/**'
  },
  plugins: [
    resolve(),
    babel({
      exclude: 'node_modules/**' // 只编译我们的源代码
    })
  ]
}
