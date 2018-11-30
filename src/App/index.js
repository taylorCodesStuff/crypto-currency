import React, { Component } from 'react';
import Welcome from './Welcome';
import './App.css';
import AppLayout from './AppLayout';

class App extends Component {
  render() {
    return (
      <AppLayout>
        <Welcome />
      </AppLayout>
    );
  }
}

export default App;
