import React from 'react'

const baseUrl = process.env.REACT_APP_API

export function useGet(endpoint) {
  const [data, setData] = React.useState(null)
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState(null)
  React.useEffect(() => {
    const fullUrl = `${baseUrl}/${endpoint}`
    async function fetchData() {
      try {
        const res = await fetch(fullUrl)
        const data = await res.json()
        setData(data)
        setLoading(false)
      } catch (error) {
        setError(error)
      }
    }
    fetchData()
  }, [endpoint])
  return [data, loading, error]
}

export function useRest(endpoint, method = 'POST') {
  return async function handleFetch(data) {
    try {
      return await fetch(`${baseUrl}/${endpoint}`, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrer: 'no-referrer',
        body: JSON.stringify(data)
      })
    } catch (error) {
      return error
    }
  }
}
