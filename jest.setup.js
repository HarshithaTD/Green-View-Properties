require('react-native-gesture-handler/jestSetup');

jest.mock('react-native-linear-gradient', () => {
  const {View} = require('react-native');

  return View;
});

jest.mock(
  '@react-native-async-storage/async-storage',
  () =>
    require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);

jest.mock('react-native-image-picker', () => ({
  launchImageLibrary: jest.fn(),
}));

const MockIcon = 'Icon';

jest.mock('react-native-vector-icons/Feather', () => MockIcon);
jest.mock('react-native-vector-icons/Ionicons', () => MockIcon);

jest.mock('react-native-reanimated', () =>
  require('react-native-reanimated/mock'),
);

jest.mock('react-native-worklets', () => ({
  createSerializable: (value) => value,
  createWorkletRuntime: jest.fn(),
  isWorkletFunction: () => false,
  RuntimeKind: {
    ReactNative: 'react-native',
  },
  runOnJS: (fn) => fn,
  runOnUI: (fn) => fn,
  scheduleOnUI: (fn) => fn,
  serializableMappingCache: new Map(),
}));
