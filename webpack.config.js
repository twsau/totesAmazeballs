const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
	devServer: {
		contentBase: path.join(__dirname, 'dist'),
    compress: true,
		disableHostCheck: true,
		host: '0.0.0.0',
    hot: true,
    port: 3000,
    open: 'brave-browser'
  },
	entry: {
		main: path.resolve(__dirname, './src/index.js'),
	},
	mode: 'development',
	module: {
	  rules: [
	    {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
	  ]
	},
	output: {
		path: path.resolve(__dirname, './dist'),
		filename: '[name].bundle.js',
	},
	plugins: [
    	new HtmlWebpackPlugin({
	    	title: 'amazeballs',
	    	template: path.resolve(__dirname, './src/template.html'), // template file
	    	filename: 'index.html', // output file
			}),
			new CleanWebpackPlugin(),
			new CopyPlugin({
	      patterns: [
	        { from: "src/asset", to: "asset" },
	      ],
	    }),
	],
};