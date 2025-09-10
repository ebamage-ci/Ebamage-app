// const { getDefaultConfig } = require("expo/metro-config");
// const { withNativeWind } = require("nativewind/metro");

// const {
//   wrapWithReanimatedMetroConfig,
// } = require('react-native-reanimated/metro-config');

// const config = getDefaultConfig(__dirname);

// module.exports = withNativeWind(config, { input: "./app/global.css" });

// metro.config.js
const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");
const {
  wrapWithReanimatedMetroConfig,
} = require("react-native-reanimated/metro-config");

let config = getDefaultConfig(__dirname);

// Appliquer Reanimated d'abord
config = wrapWithReanimatedMetroConfig(config);

// Ensuite appliquer NativeWind
config = withNativeWind(config, {
  input: "./app/global.css",
});

module.exports = config;
