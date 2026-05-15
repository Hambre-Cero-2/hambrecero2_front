import api from './api'

export const login = (credentials) => {
  return api.post('/auth/login', credentials)
}

export const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('role')
  localStorage.removeItem('username')
}

export const isLoggedIn = () => {
  return !!localStorage.getItem('token')
}

export const getRole = () => {
  return localStorage.getItem('role')
}