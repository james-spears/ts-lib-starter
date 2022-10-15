import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';

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
      typescript(),
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
      typescript(),
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
      typescript(),
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
      typescript(),
    ],
  },
  {
    input: 'src/index.ts',
    output: {
      file: './dist/index.js',
      format: 'esm',
    },
    plugins: [
      resolve({
        extensions: ['.ts'],
      }),
      typescript({ tsconfig: './tsconfig.json' }),
    ],
  },
  {
    input: 'src/index.ts',
    output: {
      file: './dist/cjs/index.cjs',
      format: 'cjs',
      exports: 'named',
    },
    plugins: [
      resolve({
        extensions: ['.ts'],
      }),
      typescript(),
    ],
  },
];
