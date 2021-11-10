
// 依赖
import React, { ReactNode, useState } from 'react';
import * as auth from 'auth-provider';
import { User } from 'project-list/search-panel';

// 接口定义
interface AuthForm {
  username: string,
  password: string
}

// context
const AuthContext = React.createContext<
  {
    user: User | null;
    register: (form: AuthForm) => Promise<void>;
    login: (form: AuthForm) => Promise<void>;
    logout: () => Promise<void>;
  }
  | undefined
>(undefined);
AuthContext.displayName = "AuthContext";


// 使用context包装
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const login = (form: AuthForm) => auth.login(form).then(user => {
    setUser(user)
  })
  const register = (form: AuthForm) => auth.register(form).then(user => {
    setUser(user)
  })
  const logout = () => auth.logout().then(() => { setUser(null) });
  return (
    <AuthContext.Provider
      value={{ user, login, register, logout }}
      children={children}
    />
  );
}

// 使用context判断
export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth必须要在AuthProvider中使用');
  }
  return context
}