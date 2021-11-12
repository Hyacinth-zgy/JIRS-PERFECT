// PAKAGE
import { Form, Input, Button } from 'antd';
import { useAuth } from "context/auth-context";

// FUNCTION JSX
export const RegisterScreen = () => {
  // ###############let handlSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  let handlSubmit: (values: { username: string, password: string }) => void;
  const { register } = useAuth();

  // ############### handlSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  // ###############   event.preventDefault()
  // ###############   const username = (event.currentTarget.elements[0] as HTMLInputElement).value;
  // ###############   const password = (event.currentTarget.elements[1] as HTMLInputElement).value;
  // ###############   login({ username, password })
  // ############### }

  handlSubmit = ({ username, password }) => {
    register({ username, password })
  }
  return (
    <Form onFinish={handlSubmit}>
      <Form.Item name={'username'}>
        <Input placeholder={'username'} type="text" id={"username"}></Input>
      </Form.Item>
      <Form.Item name={'password'}>
        <Input type="text" id={"password"} />
      </Form.Item>
      <Form.Item>
        <Button htmlType={'submit'} type={'primary'}>注册</Button>
      </Form.Item>
    </Form>
  );
};
