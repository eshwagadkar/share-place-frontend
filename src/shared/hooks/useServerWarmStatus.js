import { useEffect, useState } from 'react'

export function useServerWarmStatus(backendUrl) {
  const [isCold, setIsCold] = useState(true)

  useEffect(() => {
    let timeoutId

    async function checkServer() {
      // If backend takes > 3500ms, assume it's cold
      timeoutId = setTimeout(() => {
        setIsCold(true)
      }, 3500)

      try {
        await fetch(`${backendUrl}/health`)
        clearTimeout(timeoutId)
        setIsCold(false)
      } catch (err) {
        console.log("Server still waking…")
      }
    }

    checkServer()
  }, [])

  return isCold
}
