// PAKAGE
import { LongButton } from './index'
import { Form, Input } from 'antd';
import { useAuth } from "context/auth-context";

// FUNCTION JSX
export const LoginScreen = ({ onError }: { onError: (error: Error) => void }) => {
  // FUNCTION DIFINED
  // ############## let handlSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  let handlSubmit: (values: { username: string, password: string }) => void;
  const { login } = useAuth();

  // 原生
  // ############## handlSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  // ##############   event.preventDefault()
  // ##############   const username = (event.currentTarget.elements[0] as HTMLInputElement).value;
  // ##############   const password = (event.currentTarget.elements[1] as HTMLInputElement).value;
  // ##############   login({ username, password })
  // ############## }

  // antd 提交事件
  handlSubmit = async ({ username, password }) => {
    try {
      await login({ username, password })
    } catch (e) {
      console.log(e)
      onError(e as Error)
    }
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
        <LongButton htmlType={"submit"} type={'primary'}>Login</LongButton>
      </Form.Item>
    </Form>
  );
};
