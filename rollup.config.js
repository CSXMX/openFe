import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import {
  terser
} from 'rollup-plugin-terser';
const isProd = process.env.NODE_ENV === 'production';

export default {
  input: 'src/index.ts',
  output: [{
      file: 'dist/cjs/index.js',
      format: 'cjs',
      globals: {
        "react": "React",
        "antd": "Antd"
      },
    },
    {
      file: 'dist/es/index.js',
      format: 'esm',
    },
  ],
  external: ['react', 'antd'],
  plugins: [
    resolve(),
    commonjs(),
    typescript(),
    babel({
      extensions: ['.ts', '.tsx'],
      babelHelpers: 'bundled',
      presets: ['@babel/preset-env', '@babel/preset-react'],
      exclude: /node_modules/,
    }),
    isProd && terser()
  ],
};