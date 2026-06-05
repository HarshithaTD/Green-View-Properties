module.exports = {
  preset: '@react-native/jest-preset',
  setupFilesAfterEnv: [
    '<rootDir>/jest.setup.js',
  ],
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|@react-navigation|react-native-drawer-layout|react-native-reanimated|react-native-worklets|react-native-gesture-handler|react-native-screens|react-native-safe-area-context|react-redux|@reduxjs/toolkit|redux|immer|reselect|redux-thunk)/)',
  ],
};
