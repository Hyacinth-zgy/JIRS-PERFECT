import { List } from "./list";
import { useState, useEffect } from "react";
import { SearchPannel } from "./search-panel";
export const Index = () => {
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  const [list, setList] = useState([]);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch("").then(async (res) => {
      if (res.ok) {
        setList(await res.json());
      }
    });
  }, []);
  return (
    <div>
      <List list={list}></List>
      <SearchPannel
        setList={setList}
        setParam={setParam}
        param={param}
        users={users}
      ></SearchPannel>
    </div>
  );
};
