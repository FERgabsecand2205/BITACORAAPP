module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'react-native-reanimated/plugin',
      [
        'module-resolver',
        {
          root: ['./src'],
          extensions: ['.ios.js', '.android.js', '.js', '.jsx', '.ts', '.tsx', '.json'],
          alias: {
            '@components': './src/components',
            '@screens': './src/screens',
            '@navigation': './src/navigation',
            '@utils': './src/utils',
            '@assets': './src/assets',
            '@hooks': './src/hooks',
            '@context': './src/context',
            '@services': './src/services',
            '@constants': './src/constants',
            '@types': './src/types',
          },
        },
      ],
    ],
  };
};
