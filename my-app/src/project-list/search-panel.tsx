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
      <input
        type="text"
        onChange={(evt) => {
          setParam({
            ...param,
            name: evt.target.value,
          });
        }}
      />
      <select
        value={param.personId}
        onChange={(evt) => {
          setParam({
            ...param,
            personId: evt.target.value,
          });
        }}
      >
        <option value={""}>负责人</option>
        {users.map((user) => {
          return (
            <option value={user.id} key={user.id}>
              {user.name}
            </option>
          );
        })}
      </select>
    </div>
  );
};
