import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';

export default [
  {
    input: 'src/index.ts',
    output: {
      file: './dist/index.cjs',
      format: 'cjs',
      exports: 'named',
      sourcemap: true,
    },
    plugins: [
      commonjs(),
      json(),
      resolve({
        extensions: ['.ts', '.js'],
      }),
      typescript({
        sourceMap: true,
      }),
    ],
  },
];
