import { useEffect, } from 'react'
import { createSession, } from './ImageFeed'

export const useInitSession = () => {
  const sessionId = createSession()
  localStorage.setItem('allFeedsImagesList', JSON.stringify({}))


  useEffect(() => {
    const sessionsListening = (event: StorageEvent) => {
      if (event.newValue === 'new session created') {
        // localStorage('allFeedsImagesList')
        const sessions = JSON.parse(localStorage.getItem('sessions') || '{}')
        sessions[ sessionId ] = true
        localStorage.setItem('sessions', JSON.stringify(sessions))
      }
    }


    window.addEventListener('storage', sessionsListening)

    return () => {
      window.removeEventListener('storage', sessionsListening)
    }
  }, [])
}
