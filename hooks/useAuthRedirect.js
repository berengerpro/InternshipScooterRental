import Router from 'next/router'
import { useEffect } from 'react'

const useAuthRedirect = (condition = false, redirectTo = '/signin') => useEffect(() => {
  if (condition) {
    Router.push(redirectTo)
  }
}, [])

export default useAuthRedirect
