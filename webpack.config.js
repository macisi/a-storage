module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'index.js',
    path: './dist'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015']   
        }
      }
    ]
  }
};