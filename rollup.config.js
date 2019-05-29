import nodeResolve from 'rollup-plugin-node-resolve';     // 帮助寻找node_modules里的包
import babel from 'rollup-plugin-babel';                  // rollup 的 babel 插件，ES6转ES5
import commonjs from 'rollup-plugin-commonjs';            // 将非ES6语法的包转为ES6可用
import { uglify } from 'rollup-plugin-uglify';                // 压缩包

export default {
  input: 'src/index.js',
  output: { 
    file: 'dist/flat.min.js',
    format: 'iife',
    name: 'flat',               // 打包后的全局变量，如浏览器端 window.flat
  },
  plugins: [
    nodeResolve(),
    babel({
      exclude: '**/node_modules/**'
    }),
    commonjs(),
    uglify()
  ]
};