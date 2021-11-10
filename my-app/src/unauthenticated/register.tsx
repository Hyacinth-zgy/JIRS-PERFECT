// PAKAGE
import { useAuth } from "context/auth-context";

// FUNCTION JSX
export const RegisterScreen = () => {
  // FUNCTION DIFINED
  let handlSubmit: (event: React.FormEvent<HTMLFormElement>) => void;

  const { login, user } = useAuth();
  handlSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const username = (event.currentTarget.elements[0] as HTMLInputElement).value;
    const password = (event.currentTarget.elements[1] as HTMLInputElement).value;
    login({ username, password })
  }
  // JSX
  return (
    <form onSubmit={handlSubmit}>
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
      <button type={"submit"}>注册</button>
    </form>
  );
};
