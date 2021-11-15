// PAKAGE
import { Row } from "component/lib";
import styled from "@emotion/styled";
import { useAuth } from "context/auth-context";
import { ProjectListScreen } from "project-list";

// FUNCTION
export const AuthenticatedApp = () => {
  const { logout } = useAuth();
  return <Container>
    <Header>
      <HeaderLeft gap={true}>
        <h3>Logo</h3>
        <h3>项目</h3>
        <h3>用户</h3>
      </HeaderLeft>
      <HeaderRight>
        <button onClick={() => { logout() }}>退出登录</button>
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

const Header = styled.header`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

const HeaderLeft = styled(Row)`
  display: flex;
  align-items: center;
`

const HeaderRight = styled.div``


const Main = styled.main`
  height:  calc(100vh - 6rem);
`
