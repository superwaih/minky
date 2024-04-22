export const fetcher = (...args) => fetch(...args, {cache: 'no-store'}).then(res => res.json())

export const BASE_URL = `https://price.jup.ag/v4`

