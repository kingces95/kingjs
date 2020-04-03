var Spaces = 2

function stringify(pojo) {
  return JSON.stringify(pojo, null, Spaces)
}

module.exports = stringify