import useSWR from 'swr'
import { getToken } from './userAuth'

export const PROFILE_URL = `${process.env.NEXT_PUBLIC_API_URL}/users`

const useUser = id => {
  const fetcher = async url => {
    if (!id) {
      return undefined
    }

    const res = await fetch(`${url}/${id}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    })

    if (!res.ok) {
      const error = new Error('An error occurred while fetching the data.')
      // Attach extra info to the error object.
      error.info = await res.json()
      error.status = res.status
      throw error
    }
    return res.json()
  }

  const { data, error } = useSWR(PROFILE_URL, fetcher)

  return {
    profile: data,
    error: error && error.message,
  }
}

export default useUser
