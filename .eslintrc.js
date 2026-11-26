module.exports = {
  root: true,
  extends: '@react-native',
  overrides: [
    {
      // El setup de Jest usa el global `jest` sin importarlo.
      files: ['jest.setup.js'],
      env: { jest: true },
    },
  ],
};
