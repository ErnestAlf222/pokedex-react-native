require('react-native-gesture-handler/jestSetup');

// Mocks oficiales de Worklets y Reanimated (Worklets va primero).
jest.mock('react-native-worklets', () =>
  require('react-native-worklets/src/mock'),
);

jest.mock('react-native-reanimated', () =>
  require('react-native-reanimated/mock'),
);

// Mock oficial de NetInfo (siempre conectado por defecto).
jest.mock('@react-native-community/netinfo', () =>
  require('@react-native-community/netinfo/jest/netinfo-mock.js'),
);
