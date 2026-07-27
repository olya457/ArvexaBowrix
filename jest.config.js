module.exports = {
  preset: 'react-native',
  transformIgnorePatterns: [
    'node_modules/(?!((@)?react-native|@react-native-community)/|@react-navigation/|react-native-screens)',
  ],
};
