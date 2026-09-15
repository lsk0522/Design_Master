import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: false,
  splitting: false,
  sourcemap: true,
  clean: true,
  external: ['react', 'react-dom', '@essence/tokens', '@essence/core'],
  treeshake: true,
  minify: false,
  platform: 'neutral',
  target: 'es2022',
  esbuildOptions: (options) => {
    options.loader = {
      ...options.loader,
      '.css': 'local-css',
    };
  },
});