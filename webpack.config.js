// module.exports = {
//     module: {
//       rules: [
//         {
//           test: /\.m?js/,
//           resolve: {
//             fullySpecified: false,
//           },
//         },
//         {
//           enforce: 'pre',
//           test: /\.js$/,
//           exclude: /node_modules/,  // Игнорируем node_modules
//           loader: 'source-map-loader',
//         },
//       ],
//     },
//     ignoreWarnings: [
//         {
//           module: /@mediapipe\/tasks-vision/, // Игнорируем предупреждения для этого модуля
//           message: /Failed to parse source map/, // Игнорируем ошибки, связанные с source map
//         },
//       ]
//   };