// module.exports = {
//   plugins: {
//     tailwindcss: {},
//     autoprefixer: {},
//   },
// }
module.exports = {
  plugins: {
    tailwindcss: {
      // Customize Tailwind CSS configuration options
      purge: ['./src/**/*.html', './src/**/*.js'],
      theme: {
        extend: {},
      },
    },
    autoprefixer: {
      // Add Autoprefixer options
      flexbox: 'no-2009',
    },
  },
};
