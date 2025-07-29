const path = require('path');

module.exports = {
  mode: 'production',
  devtool: 'source-map',
  entry: './src/index.ts',
  
  externals: {
    'axios': 'axios',
    'cheerio': 'cheerio',
    'iso8601-duration': 'iso8601-duration',
    'microdata-node': 'microdata-node'
  },
  
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
          options: {
            // Only emit declarations once (webpack handles JS output)
            compilerOptions: {
              declaration: true,
              declarationMap: true,
              outDir: './lib'
            }
          }
        }
      }
    ]
  },
  
  resolve: {
    extensions: ['.ts', '.js'],
  },
  
  optimization: {
    minimize: true,
    // Use built-in TerserPlugin (webpack 5 default)
    minimizer: ['...'], // Use webpack 5 defaults
  },
  
  output: {
    path: path.resolve(__dirname, 'lib'),
    filename: 'index.js',
    
    // Library output format - compatible with both CommonJS and UMD
    library: {
      name: 'recipeDataScraper',
      type: 'umd',
      export: 'default'
    },
    
    // Better compatibility across environments
    globalObject: 'typeof self !== \'undefined\' ? self : this',
    
    // Clean output
    clean: true // Webpack 5 built-in replacement for CleanWebpackPlugin
  },
  
  // Target modern Node.js (library can still work in browsers with bundlers)
  target: ['node14'],
  
  // Performance hints for library
  performance: {
    hints: 'warning',
    maxAssetSize: 500000, // 500kb
    maxEntrypointSize: 500000
  }
};
