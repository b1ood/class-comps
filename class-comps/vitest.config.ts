import { defineConfig } from 'vitest/config';
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    test: {
        environment: 'jsdom',
        globals: true,
        setupFiles: 'src/tests/setup.ts',
        css: false,
        coverage: {
            enabled: true,
            all: true,
            provider: 'v8',
            reporter: ['text'],
            include: ['src/**/*.{ts,tsx}'],
            exclude: ['**/types.ts', 'src/utils/**/*', 'src/tests/**/*', 'src/main.tsx'],
            thresholds: {
                statements: 80,
            },
        },
        silent: true,
        watch: false,
    },
});