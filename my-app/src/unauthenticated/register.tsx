// PAKAGE
import { LongButton } from './index'
import { Form, Input } from 'antd';
import { useAuth } from "context/auth-context";
import { useAsync } from 'utils/use-async';

// FUNCTION JSX
export const RegisterScreen = ({ onError }: { onError: (error: Error) => void }) => {
  // ###############let handlSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  let handlSubmit: (values: { username: string, password: string, cpassword: string }) => void;
  const { register } = useAuth();
  const { run, isLoading } = useAsync(undefined, { throwOnError: true })

  // ############### handlSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  // ###############   event.preventDefault()
  // ###############   const username = (event.currentTarget.elements[0] as HTMLInputElement).value;
  // ###############   const password = (event.currentTarget.elements[1] as HTMLInputElement).value;
  // ###############   login({ username, password })
  // ############### }

  handlSubmit = async ({ username, password, cpassword }) => {
    if (cpassword !== password) {
      onError(new Error('Please confirm password is same by two times'))
      return
    }
    try {
      await run(register({ username, password }));
    } catch (e) {
      onError(e as Error)
    }
  }
  return (
    <Form onFinish={handlSubmit}>
      <Form.Item name={'username'} rules={[{ required: true, message: 'please input username' }]}>
        <Input placeholder={'username'} type="text" id={"username"}></Input>
      </Form.Item>
      <Form.Item name={'password'} rules={[{ required: true, message: 'please input password' }]}>
        <Input placeholder={'password'} type="text" id={"password"} />
      </Form.Item>
      <Form.Item name={'cpassword'} rules={[{ required: true, message: 'please input password again' }]}>
        <Input placeholder={'confirm password'} type="text" id={"cpassword"} />
      </Form.Item>
      <Form.Item>
        <LongButton loading={isLoading} htmlType={'submit'} type={'primary'}>注册</LongButton>
      </Form.Item>
    </Form>
  );
};
