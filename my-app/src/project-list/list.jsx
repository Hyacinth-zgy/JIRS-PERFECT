export const List = ({ list }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>名称</th>
          <th>负责人</th>
        </tr>
      </thead>
      <tbody>
        {list.map((project) => {
          return (
            <tr>
              <td>{project.name}</td>
              <td>{project.personId}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
