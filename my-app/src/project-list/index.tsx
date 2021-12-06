// PAKAGEJSON
import { List } from "./list";
import { Button, Row, Typography } from "antd";
import styled from "@emotion/styled";
import { useUsers } from 'utils/user';
import { useDocumentTitle } from "./test";
import { useDebounce } from "utils/helper";
import { useProjects } from "utils/project";
import { useEffect } from "react";
import { SearchPannel } from "./search-panel";
import { useProjectsSearchParams } from './utill';
// VARIBLE


// FONCTION
export const ProjectListScreen = ({ setProjectModalOpen }: { setProjectModalOpen: (isOpen: boolean) => void }) => {
  // const [param, setParam] = useUrlQueryParam(['name', 'personId']);
  // const projectsParams = { ...param, personId: Number(param.personId) || undefined }
  const [projectsParams, setParam] = useProjectsSearchParams()
  const debounceValue = useDebounce(projectsParams, 2000);
  const { isLoading, isError, data: list, error, retry } = useProjects(debounceValue);
  const { data: users } = useUsers()
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounceValue]);
  useDocumentTitle('项目列表', false);
  return (
    <Container>
      <RowCus>
        <h1>项目列表</h1>
        <Button onClick={() => { setProjectModalOpen(true) }}>创建项目</Button>
      </RowCus>
      <SearchPannel
        setParam={setParam}
        param={projectsParams}
        users={users || []}
      ></SearchPannel>
      {
        isError ? <Typography.Text type={'danger'}>{error?.message}</Typography.Text> : null
      }
      <List refresh={retry} loading={isLoading} setProjectModalOpen={setProjectModalOpen} dataSource={list || []} users={users || []}></List>
    </Container>
  );
};

//让ProjectListScreen被whyDidYouRender追踪
ProjectListScreen.whyDidYouRender = true

const Container = styled.div`
  padding: 3.2rem;
`

const RowCus = styled(Row)`
  display: flex;
  justify-content: space-between;
`