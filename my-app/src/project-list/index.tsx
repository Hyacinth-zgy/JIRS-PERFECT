// PAKAGEJSON
import { List } from "./list";
import { useHttp } from "utils/request";
import { useState, useEffect } from "react";
import { SearchPannel } from "./search-panel";
import { cleanObject, useDebounce, useMount } from "utils/helper";
import qs from 'qs';
import styled from "@emotion/styled";
// VARIBLE


// FONCTION
export const ProjectListScreen = () => {
  const client = useHttp();
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  const [list, setList] = useState([]);
  const [users, setUsers] = useState([]);
  const debounceValue = useDebounce(param, 2000);
  useMount(() => {
    client('users').then(setUsers)
  });
  useMount(() => {
    client('projects', { data: cleanObject(debounceValue) }).then(setList)
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
      <List list={list} users={users}></List>
    </Container>
  );
};

const Container = styled.div`
  padding: 3.2rem;
`