import { FormEvent } from "react";
const hanleSubmit = (evt: FormEvent) => {
  console.log(evt)
  evt.preventDefault()
  return
};
export const LoginScreen = () => {
  return (
    <form onSubmit={hanleSubmit}>
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
