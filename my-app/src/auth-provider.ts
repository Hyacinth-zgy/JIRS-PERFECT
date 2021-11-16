import { User } from 'project-list/search-panel';

const localStorageKey = '__auth_provider_token__';
const baseURL = process.env.REACT_APP_API_URL;

export const getToken = () => window.localStorage.getItem(localStorageKey);

export const handleUserResponse = ({ user }: { user: User }) => {
  window.localStorage.setItem(localStorageKey, user.token || '');
  return user
}

export const login = (data: { username: string, password: string }): Promise<User> => {
  return fetch(baseURL + '/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then(async (res) => {
    if (res.ok) {
      return handleUserResponse(await res.json())
    }
    return Promise.reject(await res.json())
  })
}

export const register = (data: { username: string, password: string }): Promise<User> => {
  return fetch(baseURL + '/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then(async (res) => {
    if (res.ok) {
      return handleUserResponse(await res.json())
    }
    return Promise.reject(await res.json())
  })
}

export const logout = async () => window.localStorage.removeItem(localStorageKey)