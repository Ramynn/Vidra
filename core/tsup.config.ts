import {defineConfig} from 'tsup';

export default defineConfig({
  entry: ['src/**/*.(ts|tsx)'],
  splitting: false,
  sourcemap: false,
  clean: true,
  dts: true,
  format: ['esm', 'cjs'],
  silent: true,
});
