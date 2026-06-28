import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/server.ts'],
  format: ['cjs'],
  outDir: 'dist',
  external: ['pg-native'],
  noExternal: ['better-auth', 'better-auth/node', 'better-auth/adapters/prisma'],
  clean: true,
});
