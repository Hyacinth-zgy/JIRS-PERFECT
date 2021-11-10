// PAKAGE
import { ProjectListScreen } from "project-list";
import { useAuth } from "context/auth-context";
export const AuthenticatedApp = () => {
  const { logout } = useAuth();
  return <div>
    <div onClick={() => { logout() }}>退出登录</div>
    <ProjectListScreen />
  </div>
}
