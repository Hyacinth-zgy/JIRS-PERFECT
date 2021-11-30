import { useProjects } from 'utils/project';
import { Popover, Typography, List } from 'antd';
export const ProjectOpover = () => {
  const { data: projects, isLoading } = useProjects();
  const pinnedProjects = projects?.filter(project => project.pin)
  const content = <div>
    <Typography.Text type={'secondary'}>收藏项目</Typography.Text>
    <List>
      {
        pinnedProjects?.map(project => <List.Item>
          <List.Item.Meta title={project.name}></List.Item.Meta>
        </List.Item>)
      }
    </List>
  </div>
  return <Popover placement={'bottom'} content={content}>
    项目
  </Popover >
}