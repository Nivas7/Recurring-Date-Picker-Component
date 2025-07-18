// postcss.config.js
module.exports = {
  plugins: {
    "@tailwindcss/postcss": {}, // New in v4 for PostCSS integration
    autoprefixer: {}, // Still useful for browser prefixing
  },
}
