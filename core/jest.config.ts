import type {Config} from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  testMatch: ['**/*.test.(ts|tsx)'],
  moduleFileExtensions: ['ts', 'json', 'node', 'js', 'tsx'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  setupFilesAfterEnv: ['../jest-setup.ts'],
  bail: true,
  coverageReporters: ['json'],
  coverageDirectory: '../coverage',
};

export default config;
