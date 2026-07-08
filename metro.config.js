const { getDefaultConfig } = require("expo/metro-config");
const { withUniwindConfig } = require("uniwind/metro");
const {
  wrapWithReanimatedMetroConfig,
} = require("react-native-reanimated/metro-config");

let config = getDefaultConfig(__dirname);

config = wrapWithReanimatedMetroConfig(config);

module.exports = withUniwindConfig(config, {
  cssEntryFile: "./app/global.css",
  polyfills: { rem: 14 },
});
