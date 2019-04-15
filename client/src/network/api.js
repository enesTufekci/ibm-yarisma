const baseUrl = process.env.REACT_APP_API

async function get(url) {
  const res = await fetch(url)
  return await res.json()
}

const episodeEndpoint = `${baseUrl}/episode`
const episode = {
  get: async (id = '') => await get(`${episodeEndpoint}/${id}`)
}

export default {
  episode
}
