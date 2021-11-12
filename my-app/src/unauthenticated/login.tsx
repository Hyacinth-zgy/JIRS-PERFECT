// PAKAGE
import { Form, Input, Button } from 'antd';
import { useAuth } from "context/auth-context";

// FUNCTION JSX
export const LoginScreen = () => {
  // FUNCTION DIFINED
  // ############## let handlSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  let handlSubmit: (values: { username: string, password: string }) => void;
  const { login, user } = useAuth();

  // 原生
  // ############## handlSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  // ##############   event.preventDefault()
  // ##############   const username = (event.currentTarget.elements[0] as HTMLInputElement).value;
  // ##############   const password = (event.currentTarget.elements[1] as HTMLInputElement).value;
  // ##############   login({ username, password })
  // ############## }

  // antd 提交事件
  handlSubmit = ({ username, password }) => {
    login({ username, password })
  }
  return (
    <Form onFinish={handlSubmit}>
      <Form.Item name={'username'} rules={[{ required: true, message: '请输入用户名' }]}>
        <Input placeholder={'username'} type="text" id={"username"}></Input>
      </Form.Item>
      <Form.Item name={'password'} rules={[{ required: true, message: '请输入密码' }]}>
        <Input placeholder={'password'} type="text" id={"password"} />
      </Form.Item>
      <Form.Item>
        <Button htmlType={"submit"} type={'primary'}>Login</Button>
      </Form.Item>
    </Form>
  );
};
