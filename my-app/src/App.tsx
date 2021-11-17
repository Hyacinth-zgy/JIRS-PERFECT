// PAKAGE
import './App.css';
import { useAuth } from 'context/auth-context';
import { UnauthenticatedApp } from 'unauthenticated';
import { AuthenticatedApp } from 'authenticated-app';
import { ErrorBoundary } from 'component/error-boundary'
import { FullPageErrorFallback } from 'component/lib';

// FUNCTION JSX
function App() {
  const { user } = useAuth();
  return (
    <div className="App">
      <ErrorBoundary fallbackRender={FullPageErrorFallback}>
        {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
      </ErrorBoundary>
    </div>
  );
}

export default App;
