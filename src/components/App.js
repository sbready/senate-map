import React, { Component } from 'react';
import UsaMap from './UsaMap';

class App extends Component {
  render() {
    return (
      <div>
        <h1 className="title">US Senators</h1>
        <UsaMap />
      </div>
    );
  }
}

export default App;