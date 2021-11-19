// PAKAGE
import { Row } from "component/lib";
import styled from "@emotion/styled";
import { ProjectScreen } from 'project'
import { Navigate, Route, Routes, } from 'react-router';
import { Dropdown, Menu, Button } from "antd";
import { useAuth } from "context/auth-context";
import { ProjectListScreen } from "project-list";
import { BrowserRouter as Router } from 'react-router-dom';
import { ReactComponent as SoftwareLogo } from 'assets/software-logo.svg'

// FUNCTION
export const AuthenticatedApp = () => {

  return <Container>
    <PageHeader></PageHeader>
    <Main>
      <Router>
        <Routes>
          <Route path={'/projects'} element={<ProjectListScreen />}></Route>
          <Route path={'/projects/:projectId/*'} element={<ProjectScreen />}></Route>\
          <Navigate to={'/projects'}></Navigate>
        </Routes>
      </Router>
    </Main>
  </Container>
}

const PageHeader = () => {
  const { logout, user } = useAuth();
  return (
    <Header between={true}>
      <HeaderLeft gap={true}>
        <SoftwareLogo width={'18rem'} color={'rgb(38,132,255)'} />
        <h3>项目</h3>
        <h3>用户</h3>
      </HeaderLeft>
      <HeaderRight>
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
      </HeaderRight>
    </Header>
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
