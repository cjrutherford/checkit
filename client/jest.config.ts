export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/src/**/*.spec.ts'],
  coverageDirectory: 'coverage',
  collectCoverage: true,
};