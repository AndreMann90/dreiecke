import React, { Component } from 'react';
import './App.css';
import NewTriangle from './NewTriangle';
import TrianlgeList from './TriangleList';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {items: []};
  }

  render() {
    return (
      <div>
        <h3>Dreiecksrechner</h3>
        <NewTriangle onNew={(item) => this.newItem(item)}/>
        <TrianlgeList items={this.state.items} />
      </div>
    );
  }

  newItem(newItem) {
    this.setState((prevState) => ({
    items: prevState.items.concat(newItem),
  }));
  }
}

export default App;
