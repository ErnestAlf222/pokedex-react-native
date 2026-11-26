module.exports = {
  preset: '@react-native/jest-preset',
  resolver: require.resolve('react-native-reanimated/jest/resolver'),
  setupFiles: ['<rootDir>/jest.setup.js'],
  transform: {
    '^.+\\.ttf$': require.resolve(
      '@react-native/jest-preset/jest/assetFileTransformer.js',
    ),
  },
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?|@react-native-vector-icons|@react-navigation|react-native-gesture-handler|react-native-reanimated|react-native-worklets)/)',
  ],
};
