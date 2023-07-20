module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  setupFiles: ['./jest.setup.js'],
  plugins: [
    'babel-plugin-transform-import-meta',
  ],
}