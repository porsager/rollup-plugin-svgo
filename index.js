
module.exports = function svg(options) {
  const { optimize } = require('svgo');
  return {
    name: 'svgo',
    transform: (code, id) => {
      if (id.endsWith('.svg')) {
        const result = options?.raw ? { data: code } : optimize(code, { path: id, ...options })
        return {
          map: { mappings: '' },
          code: 'export default ' + JSON.stringify(result.data)
        }
      }
    }
  }
}
