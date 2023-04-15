import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';

export default [
  {
    input: 'src/index.ts',
    output: {
      file: './dist/bundles/index.umd.js',
      format: 'umd',
      name: 'corerxplc',
      sourcemap: true,
    },
    plugins: [
      resolve({
        extensions: ['.ts'],
      }),
      typescript({
        sourceMap: true,
      }),
    ],
  },
  {
    input: 'src/index.ts',
    output: {
      file: './dist/bundles/index.umd.min.js',
      format: 'umd',
      name: 'corerxplc',
      sourcemap: true,
    },
    plugins: [
      resolve({
        extensions: ['.ts'],
      }),
      typescript({
        sourceMap: true,
      }),
      terser(),
    ],
  },
  {
    input: 'src/index.ts',
    output: {
      file: './dist/bundles/index.esm.js',
      format: 'esm',
      sourcemap: true,
    },
    plugins: [
      resolve({
        extensions: ['.ts'],
      }),
      typescript({
        sourceMap: true,
      }),
    ],
  },
  {
    input: 'src/index.ts',
    output: {
      file: './dist/bundles/index.esm.min.js',
      format: 'esm',
      sourcemap: true,
    },
    plugins: [
      resolve({
        extensions: ['.ts'],
      }),
      typescript({ sourceMap: true }),
      terser(),
    ],
  },
  {
    input: 'src/index.ts',
    output: {
      file: './dist/index.js',
      format: 'esm',
      sourcemap: true,
    },
    plugins: [
      resolve({
        extensions: ['.ts'],
      }),
      typescript({ sourceMap: true }),
    ],
  },
  {
    input: 'src/index.ts',
    output: {
      file: './dist/cjs/index.cjs',
      format: 'cjs',
      exports: 'named',
      sourcemap: true,
    },
    plugins: [
      resolve({
        extensions: ['.ts'],
      }),
      typescript({
        sourceMap: true,
      }),
    ],
  },
];
