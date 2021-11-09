import { List } from "./list";
import { useState, useEffect } from "react";
import { SearchPannel } from "./search-panel";
import { cleanObject } from "utils/helper";
import qs from "qs";
const baseURL = process.env.REACT_APP_BASE_URL;
export const Index = () => {
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  const [list, setList] = useState([]);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch(baseURL + "/users").then(async (res) => {
      if (res.ok) {
        setUsers(await res.json());
      }
    });
    fetch(baseURL + "/projects").then(async (res) => {
      if (res.ok) {
        setList(await res.json());
      }
    });
  }, []);
  useEffect(() => {
    fetch(baseURL + `/projects?${qs.stringify(cleanObject(param))}`).then(
      async (res) => {
        if (res.ok) {
          setList(await res.json());
        }
      }
    );
  }, [param]);
  return (
    <div>
      <SearchPannel
        setList={setList}
        setParam={setParam}
        param={param}
        users={users}
      ></SearchPannel>
      <List list={list} users={users}></List>
    </div>
  );
};
