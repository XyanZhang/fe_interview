import commonjs from 'rollup-plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
// import babel from  '@rollup/plugin-babel';
export default {
    input: 'src/reactivity/index.js',
    output: [
        {
            file: 'dist/bundle-cjs.js',
            format: 'cjs'
        },
        {
            file: 'dist/bundle-es.js',
            format: 'es'
        },
        {
            name: 'VueGlobal',
            file: 'dist/bundle-umd.js',
            format: 'umd'
        },
    ],
    plugins: [
        // commonjs(),
        // resolve()
    ]
  };