import api from './api'

export const login = (credentials) => {
  return api.post('/auth/login', credentials)
}

export const saveSession = (data) => {
  localStorage.setItem('token', data.token)
  localStorage.setItem('role', data.role)
  localStorage.setItem('username', data.username)
}

export const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('role')
  localStorage.removeItem('username')
}

export const isLoggedIn = () => {
  return !!localStorage.getItem('token')
}

export const getUserRole = () => {
  return localStorage.getItem('role')
}

export const getUsername = () => {
  return localStorage.getItem('username')
}