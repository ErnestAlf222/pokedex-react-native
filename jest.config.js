module.exports = {
  preset: '@react-native/jest-preset',
  resolver: require.resolve('react-native-reanimated/jest/resolver'),
  setupFiles: ['<rootDir>/jest.setup.js'],
  transform: {
    '^.+\\.ttf$': require.resolve(
      '@react-native/jest-preset/jest/assetFileTransformer.js',
    ),
  },
  // Un solo patrón: transforma todo react-native*, @react-native* y @react-navigation (ESM).
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native[^/]*|@react-native[^/]*|@react-navigation)/)',
  ],
};
