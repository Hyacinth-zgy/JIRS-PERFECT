import { Table, TableProps } from 'antd';
import { spawn } from 'child_process';
import dayjs from 'dayjs';
import { useEffect } from "react";
import { User } from './search-panel';

interface Project {
  id: string,
  name: string,
  organization: string,
  personId: string,
  created: string,
}

// 直接继承TableProps就不需要自己写loading属性
interface ListProps extends TableProps<Project> {
  users: User[]
}
export const List = ({ users,...props }: ListProps) => {
  return (
    <Table pagination={false} columns={[{
      title: '名称',
      dataIndex: 'name',
      sorter: (a, b) => {
        return a.name.localeCompare(b.name)
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
