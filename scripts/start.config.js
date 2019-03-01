module.exports = {
  port: 3127,
  server: './demo',
  serveStatic: ['./dist'],
  files: ['./demo', './dist'],
  rewriteRules: [{
    match: '"https://ucarecdn.com/libs/widget-tab-effects/1.x/uploadcare.tab-effects.min.js"',
    replace: '"uploadcare.tab-effects.js"',
  }],
}
