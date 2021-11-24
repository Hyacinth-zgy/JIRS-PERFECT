// PAKAGEJSON
import { List } from "./list";
import { Typography } from "antd";
import styled from "@emotion/styled";
import { useUsers } from 'utils/user';
import { useDocumentTitle } from "./test";
import { useDebounce } from "utils/helper";
import { useProjects } from "utils/project";
import { useState, useEffect } from "react";
import { useUrlQueryParam } from "utils/url";
import { SearchPannel } from "./search-panel";
// VARIBLE


// FONCTION
export const ProjectListScreen = () => {
  const [, setParam] = useState({
    name: "",
    personId: "",
  });
  const [param] = useUrlQueryParam(['name', 'personId'])
  const debounceValue = useDebounce(param, 2000);
  const { isLoading, isError, data: list, error } = useProjects(debounceValue);
  const { data: users } = useUsers()
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounceValue]);
  useDocumentTitle('项目列表', false);
  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPannel
        setParam={setParam}
        param={param}
        users={users || []}
      ></SearchPannel>
      {
        isError ? <Typography.Text type={'danger'}>{error?.message}</Typography.Text> : null
      }
      <List loading={isLoading} dataSource={list || []} users={users || []}></List>
    </Container>
  );
};

//让ProjectListScreen被whyDidYouRender追踪
ProjectListScreen.whyDidYouRender = true

const Container = styled.div`
  padding: 3.2rem;
`