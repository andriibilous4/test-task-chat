import React from 'react';
import Chat from './components/Chat';
import { Provider } from 'react-redux';
import store from './redux/store';

function App() {
  return (
    <Provider store={store}>
      <div className="app">
        <Chat />
      </div>
    </Provider>
  );
}

export default App;