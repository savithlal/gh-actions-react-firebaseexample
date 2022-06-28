module.exports = {
  project: {
    ios: {},
    android: {}, // grouped into "project"
  },
  assets: ['./src/app/Assets/Fonts'], // stays the same
  // commands: require('./path-to-commands.js'), // formerly "plugin", returns an array of commands
  dependencies: {
    'react-native-vector-icons': {
      platforms: {
        ios: null,
      },
    },
  },
};
