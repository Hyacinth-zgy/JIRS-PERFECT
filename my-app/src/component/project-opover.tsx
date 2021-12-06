import { useProjects } from 'utils/project';
import { Popover, Typography, List, Divider, Button } from 'antd';
export const ProjectOpover = (props: { projectButton: JSX.Element }) => {
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
    <Divider></Divider>
    {
      props.projectButton
    }
  </div>
  return <Popover placement={'bottom'} content={content}>
    项目
  </Popover >
}