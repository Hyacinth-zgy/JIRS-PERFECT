// PAKAGEJSON
import { List } from "./list";
import { useHttp } from "utils/request";
import { useState, useEffect } from "react";
import { SearchPannel } from "./search-panel";
import { cleanObject, useDebounce, useMount } from "utils/helper";
import qs from 'qs';
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
  }, [debounceValue]);
  return (
    <div>
      <SearchPannel
        setParam={setParam}
        param={param}
        users={users}
      ></SearchPannel>
      <List list={list} users={users}></List>
    </div>
  );
};
