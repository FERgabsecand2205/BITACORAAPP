const createExpoWebpackConfigAsync = require('@expo/webpack-config');

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);
  
  // Personalizar la configuración aquí
  config.resolve.alias = {
    ...config.resolve.alias,
    'react-native$': 'react-native-web'
  };

  // Agregar fallbacks para módulos nativos
  config.resolve.fallback = {
    ...config.resolve.fallback,
    "crypto": require.resolve("crypto-browserify"),
    "stream": require.resolve("stream-browserify"),
    "vm": require.resolve("vm-browserify")
  };

  return config;
}; 