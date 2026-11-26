require('react-native-gesture-handler/jestSetup');

// Mocks oficiales de Worklets y Reanimated (Worklets va primero).
jest.mock('react-native-worklets', () =>
  require('react-native-worklets/src/mock'),
);

jest.mock('react-native-reanimated', () =>
  require('react-native-reanimated/mock'),
);

// Stub mínimo de Nitro: bajo Jest MMKV usa su propio mock en memoria y nunca llama al módulo nativo.
jest.mock('react-native-nitro-modules', () => ({
  NitroModules: { createHybridObject: jest.fn() },
}));

// Mock oficial de NetInfo (siempre conectado por defecto).
jest.mock('@react-native-community/netinfo', () =>
  require('@react-native-community/netinfo/jest/netinfo-mock.js'),
);
