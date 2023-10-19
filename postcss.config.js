module.exports = {
  plugins: {
    tailwindcss: {
      purge: ['./src/**/*.html', './src/**/*.js'],
      theme: {
        extend: {},
      },
    },
    autoprefixer: {
      
      flexbox: 'no-2009',
    },
  },
};
