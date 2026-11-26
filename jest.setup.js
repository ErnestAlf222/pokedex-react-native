require('react-native-gesture-handler/jestSetup');

// Mocks oficiales de Worklets y Reanimated (Worklets va primero).
jest.mock('react-native-worklets', () =>
  require('react-native-worklets/src/mock'),
);

jest.mock('react-native-reanimated', () =>
  require('react-native-reanimated/mock'),
);
