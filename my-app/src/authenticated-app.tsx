// PAKAGE
import { Row } from "component/lib";
import styled from "@emotion/styled";
import { useAuth } from "context/auth-context";
import { ProjectListScreen } from "project-list";
import { ReactComponent as SoftwareLogo } from 'assets/software-logo.svg'
import { Dropdown, Menu, Button } from "antd";

// FUNCTION
export const AuthenticatedApp = () => {
  const { logout, user } = useAuth();
  const value: any = undefined;
  return <Container>
    <Header between={true}>
      <HeaderLeft gap={true}>
        {value.a}
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
    <Main>
      <ProjectListScreen />
    </Main>
  </Container>
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
