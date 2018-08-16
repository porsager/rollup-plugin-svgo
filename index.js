const defaults = {
  plugins: [{
    removeViewBox: false
  }, {
    removeDimensions: true
  }]
}

module.exports = function svg(options) {
  const svgo = options && options.raw
    ? ({ optimize: x => Promise.resolve({ data: x }) })
    : (new require('svgo'))(options || defaults)

  return {
    name: 'svg',
    transform: (code, id) => {
      if (id.endsWith('.svg')) {
        return svgo.optimize(code).then(result => ({
          map: { mappings: '' },
          code: 'export default ' + JSON.stringify(result.data)
        }))
      }
    }
  }
}
