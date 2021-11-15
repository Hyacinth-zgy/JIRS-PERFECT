// PAKAGEJSON
import { List } from "./list";
import { useHttp } from "utils/request";
import { useState, useEffect } from "react";
import { SearchPannel } from "./search-panel";
import { cleanObject, useDebounce, useMount } from "utils/helper";
import qs from 'qs';
import styled from "@emotion/styled";
import { Typography } from "antd";
// VARIBLE


// FONCTION
export const ProjectListScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<null | Error>(null);
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  const [list, setList] = useState([]);
  const [users, setUsers] = useState([]);
  const debounceValue = useDebounce(param, 2000);
  const client = useHttp();
  useMount(() => {
    client('users').then(setUsers)
  });
  useMount(() => {
    setIsLoading(true);
    client('projects', { data: cleanObject(debounceValue) }).then(setList).catch(error => {
      setError(error);
      setList([]);
    }).finally(() => {
      setIsLoading(false)
    })
  });
  useEffect(() => {
    client('projects', { data: cleanObject(debounceValue) }).then(setList)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounceValue]);
  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPannel
        setParam={setParam}
        param={param}
        users={users}
      ></SearchPannel>
      {
        error ? <Typography.Text type={'danger'}>{error.message}</Typography.Text> : null
      }
      <List loading={isLoading} dataSource={list} users={users}></List>
    </Container>
  );
};

const Container = styled.div`
  padding: 3.2rem;
`