// PAKAGE
import { LongButton } from './index'
import { Form, Input } from 'antd';
import { useAuth } from "context/auth-context";

// FUNCTION JSX
export const RegisterScreen = ({ onError }: { onError: (error: Error) => void }) => {
  // ###############let handlSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  let handlSubmit: (values: { username: string, password: string }) => void;
  const { register } = useAuth();

  // ############### handlSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  // ###############   event.preventDefault()
  // ###############   const username = (event.currentTarget.elements[0] as HTMLInputElement).value;
  // ###############   const password = (event.currentTarget.elements[1] as HTMLInputElement).value;
  // ###############   login({ username, password })
  // ############### }

  handlSubmit = async ({ username, password }) => {
    try {
      await register({ username, password })
    } catch (e) {
      onError(e as Error)
    }
  }
  return (
    <Form onFinish={handlSubmit}>
      <Form.Item name={'username'}>
        <Input placeholder={'username'} type="text" id={"username"}></Input>
      </Form.Item>
      <Form.Item name={'password'}>
        <Input placeholder={'password'} type="text" id={"password"} />
      </Form.Item>
      <Form.Item>
        <LongButton htmlType={'submit'} type={'primary'}>注册</LongButton>
      </Form.Item>
    </Form>
  );
};
