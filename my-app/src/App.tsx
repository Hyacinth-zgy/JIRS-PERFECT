// PAKAGE
import './App.css';
import { useAuth } from 'context/auth-context';
import { UnauthenticatedApp } from 'unauthenticated';
import { AuthenticatedApp } from 'authenticated-app';

// FUNCTION JSX
function App() {
  const { user } = useAuth();
  return (
    <div className="App">
      {
        user ? <AuthenticatedApp /> : <UnauthenticatedApp />
      }
    </div>
  );
}

export default App;
