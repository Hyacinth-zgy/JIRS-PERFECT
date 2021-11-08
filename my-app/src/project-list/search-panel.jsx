export const SearchPannel = ({ setList, setParam, param, users }) => {
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
          return <option value={user.id}>{user.name}</option>;
        })}
      </select>
    </div>
  );
};
