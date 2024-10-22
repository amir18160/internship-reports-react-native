module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          root: ["./src"],
          alias: {
            "@assets": "./src/assets",
            "@components": "./src/components",
            "@screens": "./src/screens",
            "@utils": "./src/utils",
            "@services": "./src/services",
            "@context": "./src/context",
            "@hooks": "./src/hooks",
            "@types": "./src/types",
          },
        },
      ],
      "react-native-reanimated/plugin",
    ],
  };
};
