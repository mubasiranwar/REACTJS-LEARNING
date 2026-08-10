import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function UserDetails() {
  const { id } = useParams()

  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const controller = new AbortController()

    async function getUser() {
      try {
        setLoading(true)
        setError(null)

        const response = await fetch(
          `https://jsonplaceholder.typicode.com/users/${id}`,
          {
            signal: controller.signal
          }
        )

        if (!response.ok) {
          throw new Error(`Failed to fetch user: ${response.status}`)
        }

        const data = await response.json()

        setUser(data)
      } catch (error) {
        if (error.name === 'AbortError') {
          return
        }

        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    getUser()

    return () => {
      controller.abort()
    }
  }, [id])

  if (loading) return <h1>Loading...</h1>
  if (error) return <h1>Error: {error}</h1>

  return (
    <div>
      <h1>{user.name}</h1>

      <p>Username: {user.username}</p>

      <p>Email: {user.email}</p>

      <p>Phone: {user.phone}</p>

      <p>Website: {user.website}</p>
    </div>
  )
}

export default UserDetails