// PAKAGE
import dayjs from 'dayjs';
import { User } from './search-panel';
import { Table, TableProps } from 'antd';
import { Link } from 'react-router-dom'
import { Pin } from 'component/pin';
import { useEditProject } from 'utils/project';

export interface Project {
  id: number,
  name: string,
  organization: string,
  personId: number,
  created: string,
  pin: boolean
}

// 直接继承TableProps就不需要自己写loading属性
interface ListProps extends TableProps<Project> {
  users: User[],
  refresh?: () => void
}
export const List = ({ users, ...props }: ListProps) => {
  const { mutate } = useEditProject();
  const pinProject = (id: number) => (pin: boolean) => mutate({ id, pin }).then(() => {
    props.refresh?.()
  })
  return (
    <Table pagination={false} columns={[
      {
        title: <Pin checked={true} disabled={true}></Pin>,
        render(value, project) {
          return (
            <Pin
              checked={project.pin}
              onCheckedChange={pinProject(project.id)}
            ></Pin>
          );
        },
      }, {
        title: '名称',
        sorter: (a, b) => {
          return a.name.localeCompare(b.name)
        },
        render(_value, project) {
          return <span>
            <Link key={project.id} to={String(project.id)}>{project.name}</Link>
          </span>
        }
      },
      {
        title: '部门',
        dataIndex: 'organization'
      },
      {
        title: "负责人",
        render(value, project) {
          return <span>
            {users.find((item) => {
              return project.personId === item.id;
            })?.name || "未知"}
          </span>
        }
      }, {
        title: '创建时间',
        render(value, project) {
          return <span>
            {
              project.created ? dayjs(project.created).format('YYYY-MM-DD') : '--'
            }
          </span>
        }
      }]} {...props}>
    </Table>
  );
};
