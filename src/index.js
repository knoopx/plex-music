if (process.env.NODE_ENV === 'production') {
  require('./index.production')
} else {
  require('./index.development')
}
