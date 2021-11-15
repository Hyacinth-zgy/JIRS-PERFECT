import { Input, Select, Form } from 'antd';
export interface User {
  id: string,
  name: string,
  token: string
}

export interface SearchPannelProps {
  users: User[],
  param: {
    name: string,
    personId: string
  },
  setParam: (param: SearchPannelProps['param']) => void
}
export const SearchPannel = ({ setParam, param, users }: SearchPannelProps) => {
  return (
    <Form style={{ marginBottom: '2rem' }} layout={'inline'}>
      <Form.Item>
        <Input
          type="text"
          placeholder={'Project name'}
          onInput={(value) => {
            console.log(value)
          }}
          onChange={(evt) => {
            console.log(evt)
            setParam({
              ...param,
              name: evt.target.value,
            });
          }}
        />
      </Form.Item>
      <Form.Item>
        <Select
          value={param.personId}
          onChange={(value) => {
            setParam({
              ...param,
              personId: value
            });
          }}
        >
          <Select.Option value={""}>负责人</Select.Option>
          {users.map((user) => {
            return (
              <Select.Option value={user.id} key={user.id}>
                {user.name}
              </Select.Option>
            );
          })}
        </Select>
      </Form.Item>
    </Form>
  );
};
