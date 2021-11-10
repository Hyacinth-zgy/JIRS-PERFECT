import { useAuth } from "context/auth-context";

const baseURL = process.env.REACT_APP_API_URL;
export const LoginScreen = () => {
  // 函数定义
  let handlSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  // ##########let login: (username: string, password: string) => void;
  // 函数逻辑
  //########### login = (username, password) => {
  //###########   fetch(baseURL + '/login', {
  //###########     method: 'POST',
  //###########     headers: {
  //###########       'Content-Type': 'application/json',
  //###########     },
  //###########     body: JSON.stringify({ username, password }),
  //###########   }).then(async (res) => {
  //###########     console.log(await res.json())
  //###########   })
  //########### }
  const { login, user, register } = useAuth();
  handlSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const username = (event.currentTarget.elements[0] as HTMLInputElement).value;
    const password = (event.currentTarget.elements[1] as HTMLInputElement).value;
    login({ username, password })
  }
  // jsx
  return (
    <form onSubmit={handlSubmit}>
      <div>
        当前登录的用户名为:{user ? user.name : ''}
      </div>
      <div>
        <label htmlFor="username">
          用户名
        </label>
        <input type="text" id={"username"}></input>
      </div>
      <div>
        <label htmlFor="password">密码</label>
        <input type="text" id={"password"} />
      </div>
      <button type={"submit"}>登录</button>
    </form>
  );
};
