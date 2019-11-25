import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import { uglify } from 'rollup-plugin-uglify'

export default {
  input: 'src/index.js',
  output: {
    name: 'ImgLazyLoad',
    file: 'dist/img-lazy-load.min.js',
    format: 'umd'
  },
  watch: {
    inlude: 'src/**'
  },
  plugins: [
    uglify(),
    resolve(),
    babel({
      exclude: 'node_modules/**' // 只编译我们的源代码
    })
  ]
}
