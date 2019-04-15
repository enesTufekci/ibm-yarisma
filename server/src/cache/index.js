function createCache() {
  let data = {}
  function getData(key) {
    return data[key]
  }

  function setData(key, value) {
    data[key] = value
    return data[key]
  }
  return {
    get: key => getData(key),
    set: (key, value) => setData(key, value),
    all: () => data
  }
}

export default createCache
