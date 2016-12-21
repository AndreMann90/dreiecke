import React, { Component } from 'react';
import './App.css';
import CustomNavbar from './CustomNavbar';
import NewShapeControl from './NewShapeControl';
import TriangleList from './TriangleList';

import { PageHeader, Grid, Row, Col } from 'react-bootstrap';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {items: [], name: ''};
  }

  render() {
    return (
        <Grid>
          <Row className="show-grid">
            <Col className="noprint" sm={12} >
                <CustomNavbar name={this.state.name} onChange={(e) => {this.setState({name: e.target.value})}}/>
            </Col>
          </Row>
          <Row className="show-grid">
            <Col className="noscreen" sm={12} >
                { this.state.name === '' ? null : <PageHeader><small>{this.state.name}</small></PageHeader>  }
            </Col>
          </Row>
          <Row className="clearfix">
            <Col className="noprint" sm={6}>
              <NewShapeControl onNew={this.newItem.bind(this)}/>
            </Col>
            <Col sm={6}>
                <TriangleList items={this.state.items} onDelete={this.deleteItem.bind(this)} onDeleteAll={this.deleteAllItems.bind(this)} />
            </Col>
          </Row>
        </Grid>
    );
  }

  newItem(newItem) {
    this.setState((prevState) =>
        ({items: prevState.items.concat(newItem).sort((a, b) => a.areaNumber - b.areaNumber)}) // "sort" is a bit wasteful, but no "insert sorted" as function available and the list will be small enough to NOT encounter any performance impact
    );
  }

  deleteItem(item) {
      const index = this.state.items.indexOf(item);
      const newList = this.state.items.splice(index, 1);
      this.setState({state: newList});
  }

  deleteAllItems() {
      this.setState({items: []});
  }
}

export default App;
