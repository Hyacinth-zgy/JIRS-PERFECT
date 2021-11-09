import { useEffect } from "react";
import { User } from './search-panel';

interface Project {
  id: string,
  name: string,
  organization: string,
  personId: string,
  created: string
}

interface ListProps {
  list: Project[],
  users: User[]
}
export const List = ({ list, users }: ListProps) => {
  useEffect(() => {
    console.log(list);
  }, [list]);
  return (
    <table>
      <thead>
        <tr>
          <th>名称</th>
          <th>负责人</th>
        </tr>
      </thead>
      <tbody>
        {list?.map((project) => {
          return (
            <tr key={project.name}>
              <td>{project.name}</td>
              <td>
                {users.find((item) => {
                  return project.personId === item.id;
                })?.name || "未知"}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
