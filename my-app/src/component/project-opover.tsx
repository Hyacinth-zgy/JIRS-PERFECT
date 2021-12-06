import { useProjects } from 'utils/project';
import { ButtonNoPadding } from './lib'
import { Popover, Typography, List, Divider, Button } from 'antd';
export const ProjectOpover = (props: { setProjectModalOpen: (isOpen: boolean) => void }) => {
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
    <ButtonNoPadding type={'link'} onClick={() => { props.setProjectModalOpen(true) }}>创建项目</ButtonNoPadding>
  </div>
  return <Popover placement={'bottom'} content={content}>
    项目
  </Popover >
}