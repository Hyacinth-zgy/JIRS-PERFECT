import { Link } from "react-router-dom";
import { Route, Routes } from 'react-router';
import { KanbanScreen } from "./kanban";
import { EpicScreen } from "./epic";

export const ProjectScreen = () => {
  return <div>
    <h1>PROJECTS SCREEN</h1>
    <Link to={'kanban'}>看板</Link>
    <Link to={'epic'}>任务组</Link>
    <Routes>
      <Route path={'kanban'} element={<KanbanScreen></KanbanScreen>}></Route>
      <Route path={'epic'} element={<EpicScreen></EpicScreen>}></Route>
      <Route path={'/'} element={<KanbanScreen></KanbanScreen>}></Route>
    </Routes>
  </div>
}