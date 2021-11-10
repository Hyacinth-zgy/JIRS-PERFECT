import React from 'react';
import { Index } from 'project-list/index';
import { LoginScreen } from 'login';
import { AppProviders } from 'context'
import './App.css';

function App() {
  return (
    <div className="App">
      {/* <Index></Index> */}
      <AppProviders>
        <LoginScreen />
      </AppProviders>
    </div>
  );
}

export default App;
