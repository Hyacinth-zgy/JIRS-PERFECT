// PAKAGE
import { useState } from "react";
import { Row } from "component/lib";
import styled from "@emotion/styled";
import { resetRouter } from 'utils/helper'
import { ProjectScreen } from 'project'
import { Route, Routes } from 'react-router';
import { Dropdown, Menu, Button } from "antd";
import { useAuth } from "context/auth-context";
import { ProjectListScreen } from "project-list";
import { BrowserRouter as Router } from 'react-router-dom';
import { ReactComponent as SoftwareLogo } from 'assets/software-logo.svg'
import { ProjectModal } from "project-list/project-modal";
import { ProjectOpover } from "component/project-opover";

// FUNCTION
export const AuthenticatedApp = () => {
  const [projectModalOpen, setProjectModalOpen] = useState(false);
  return <Container>
    <PageHeader setProjectModalOpen={setProjectModalOpen}></PageHeader>
    <Main>
      <Router>
        <Routes>
          <Route path={'/projects'} element={<ProjectListScreen setProjectModalOpen={setProjectModalOpen} />}></Route>
          <Route path={'/projects/:projectId/*'} element={<ProjectScreen />}></Route>
          <Route path={'/'} element={<ProjectListScreen setProjectModalOpen={setProjectModalOpen} />}></Route>
        </Routes>
      </Router>
    </Main>
    <ProjectModal projectModalOpen={projectModalOpen} onClose={() => {
      setProjectModalOpen(false)
    }}></ProjectModal>
  </Container>
}

const PageHeader = (props: { setProjectModalOpen: (isOpen: boolean) => void }) => {
  return (
    <Header between={true}>
      <HeaderLeft gap={true}>
        <Button style={{ padding: 0 }} type={'link'} onClick={resetRouter}>
          <SoftwareLogo width={'18rem'} color={'rgb(38,132,255)'} />
        </Button>
        <span>用户</span>
        <ProjectOpover setProjectModalOpen={props.setProjectModalOpen}></ProjectOpover>
      </HeaderLeft>
      <HeaderRight>
        <User></User>
      </HeaderRight>
    </Header>
  )
}

const User = () => {
  const { logout, user } = useAuth();
  return (
    <Dropdown overlay={
      <Menu>
        <Menu.Item key={'lagput'}>
          <Button type={'link'} onClick={logout}>退出登录</Button>
        </Menu.Item>
      </Menu>
    }>
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <Button type={'link'} onClick={e => e.preventDefault()}>Hi!{user?.name}</Button>
    </Dropdown>
  )
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr;
  height: 100vh;
`

const Header = styled(Row)`
  padding: 3.2rem;
  box-shadow: 0 0 5px 0 rgba(0,0,0,0.1);
  z-index: 1;
`

const HeaderLeft = styled(Row)`
  display: flex;
  align-items: center;
`

const HeaderRight = styled.div``


const Main = styled.main`
  height:  calc(100vh - 6rem);
`
