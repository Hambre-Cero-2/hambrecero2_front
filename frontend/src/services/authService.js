import api from './api'

export const login = (credentials) => api.post('/auth/login', credentials)

export const saveSession = (data) => {
  localStorage.setItem('token', data.token)
  localStorage.setItem('tokenType', data.type)
  localStorage.setItem('username', data.username)
  localStorage.setItem('role', data.role)
}

export const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('tokenType')
  localStorage.removeItem('username')
  localStorage.removeItem('role')
}

export const isLoggedIn = () => {
  return !!localStorage.getItem('token')
}

export const isAdmin = () => {
  return localStorage.getItem('role') === 'ADMIN'
}