var ReactDOM = require('react-dom/server')
var React = require('react')
var Root = require('./components/App')

module.exports = function render(locals, callback) {
  var html = ReactDOM.renderToStaticMarkup(React.createElement(Root, locals))
  callback(null, '<!DOCTYPE html>' + html)
}