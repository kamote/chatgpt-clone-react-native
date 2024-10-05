import { useEffect, useState } from "react"

export const useAuth = () => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isSignedIn, setIsSignedIn] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
    setIsSignedIn(false)
  },[])

  return {
    isLoaded, isSignedIn
  }
}

export const useSignIn = () => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isSignedIn, setIsSignedIn] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
    setIsSignedIn(false)
  },[])

  return {
    isLoaded, isSignedIn
  }
}