const tailwindcss = require('tailwindcss')

module.exports = {
  plugins: [
    // require('postcss-import'),
    tailwindcss('./tailwind.js'),
    // require('postcss-simple-vars'),
    require('postcss-nested'),
    require('autoprefixer'),
    // require('cssnano')({
    // discardComments: { removeAll: true },
    // }),
  ],
}
