module.exports = function(...args) {
  for (let arg of args)
    (1, eval)(require('fs').readFileSync(__dirname + '/../' + arg, 'utf8'))
}
