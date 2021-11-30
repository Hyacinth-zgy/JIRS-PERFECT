// PAKAGE
import qs from 'qs'
import * as auth from "auth-provider";
import { useAuth } from "context/auth-context";
import { useCallback } from 'react';

// VARIABLE
const apiURL = process.env.REACT_APP_API_URL;

// INTERFACR
interface Config extends RequestInit {
  token?: string,
  data?: object
}

// FUNCTIONad
export const http = async (endpoint: string, { data, token, headers, ...customConfig }: Config = {}) => {
  const config = {
    methold: 'GET',
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
      'Content-Type': data ? 'application/json' : ''
    },
    ...customConfig
  }
  if (config.methold.toUpperCase() === 'GET') {
    endpoint += `?${qs.stringify(data)}`;
  } else {
    config.body = JSON.stringify(data || {});
  }
  return window.fetch(`${apiURL}/${endpoint}`, config).then(async res => {
    if (res.status === 401) {
      await auth.logout();
      window.location.reload();
      return Promise.reject({ message: '请重新登录' })
    }
    const data = await res.json();
    if (res.ok) {
      return data
    } else {
      return Promise.reject(data)
    }
  })
}

export const useHttp = () => {
  const { user } = useAuth();
  return useCallback((...[endpoint, config]: Parameters<typeof http>) => {
    return http(endpoint, { ...config, token: user?.token || '' })
  }, [user?.token])
}
