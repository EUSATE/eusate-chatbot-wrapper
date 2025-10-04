import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'
import terser from '@rollup/plugin-terser'
import replace from '@rollup/plugin-replace'
import { readFileSync } from 'fs'

const pkg = JSON.parse(readFileSync('./package.json', 'utf8'))
const isProduction = process.env.NODE_ENV === 'production'

export default {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/eusate-sdk.esm.js',
      format: 'es',
      sourcemap: !isProduction,
    },
    {
      file: 'dist/eusate-sdk.min.js',
      format: 'iife',
      name: 'Eusate',
      sourcemap: !isProduction,
      extend: true,
      globals: {
        window: 'window',
      },
    },
  ],
  plugins: [
    replace({
      preventAssignment: true,
      values: {
        __VERSION__: JSON.stringify(pkg.version),
        'process.env.NODE_ENV': JSON.stringify(
          process.env.NODE_ENV || 'production',
        ),
      },
    }),
    resolve(),
    commonjs(),
    typescript({
      declaration: true,
      declarationDir: 'dist',
      declarationMap: true,
    }),
    ...(isProduction ? [terser()] : []),
  ],
}
