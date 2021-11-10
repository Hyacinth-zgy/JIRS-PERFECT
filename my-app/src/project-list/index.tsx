import { List } from "./list";
import { useState, useEffect } from "react";
import { SearchPannel } from "./search-panel";
import { cleanObject, useDebounce, useMount } from "utils/helper";
import qs from 'qs';
const baseURL = process.env.REACT_APP_BASE_URL;
export const ProjectListScreen = () => {
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  const [list, setList] = useState([]);
  const [users, setUsers] = useState([]);
  const debounceValue = useDebounce(param, 2000);
  useMount(() => {
    fetch(baseURL + "/users").then(async (res) => {
      if (res.ok) {
        setUsers(await res.json());
      }
    });
  });
  useMount(() => {
    fetch(baseURL + "/projects").then(async (res) => {
      if (res.ok) {
        setList(await res.json());
      }
    });
  });
  useEffect(() => {
    fetch(
      baseURL + `/projects?${qs.stringify(cleanObject(debounceValue))}`
    ).then(async (res) => {
      if (res.ok) {
        setList(await res.json());
      }
    });
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
