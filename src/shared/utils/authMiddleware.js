// authMiddleware.js
const authMiddleware = store => next => action => {
  const result = next(action)

  // Handle login
  if (action.type === 'auth/login') {
    const { userId, token } = store.getState().auth

    localStorage.setItem(
      'userData',
      JSON.stringify({
        userId,
        token
      })
    )
  }

  // Handle logout
  if (action.type === 'auth/logout') {
    localStorage.removeItem('userData')
  }

  return result
}

export default authMiddleware
