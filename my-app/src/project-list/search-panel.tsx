import { Project } from './list'
import { Input, Select, Form } from 'antd';
import { UserSelect } from 'component/user-select';
export interface User {
  id: number,
  name: string,
  token: string
}

export interface SearchPannelProps {
  param: Partial<Pick<Project, 'name' | 'personId'>>,
  users: User[],
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
        <UserSelect value={param.personId} defaultOptionName={'负责人'} onChange={(value: number | undefined) => {
          setParam({
            ...param,
            personId: value
          });
        }}></UserSelect>
        {/* <Select
          value={param.personId}
          onChange={(value) => {
            setParam({
              ...param,
              personId: value
            });
          }}
        >
          <Select.Option value={""} key={''}>负责人</Select.Option>
          {users.map((user) => {
            return (
              <Select.Option value={String(user.id)} key={user.id}>
                {user.name}
              </Select.Option>
            );
          })}
        </Select> */}
      </Form.Item>
    </Form>
  );
};
