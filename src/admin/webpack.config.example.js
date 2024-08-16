'use strict';

module.exports = (config, webpack) => {
  config.module.rules.push({
    test: /\.(png|jpe?g|gif|svg|ico)$/i,
    use: [
      {
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]',
        },
      },
    ],
  });

  // Return the modified config
  return config;
};
