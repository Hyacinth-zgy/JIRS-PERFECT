import { Input, Select } from 'antd';
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
    <div>
      <Input
        type="text"
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
    </div>
  );
};
