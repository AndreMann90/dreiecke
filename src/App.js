import React, { Component } from 'react';
import './App.css';
import NewTriangle from './NewTriangle';
import TriangleList from './TriangleList';
import PrintIt from './PrintIt';

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
            <Col className="noprint" md={10} mdOffset={1} sm={12} >
              <PageHeader>Dreiecksrechner <small>für Baustellenaufmaße</small></PageHeader>
            </Col>
          </Row>
          <Row className="show-grid">
            <Col className="noprint" xs={10} xsOffset={1} sm={8} smOffset={2} md={6} mdOffset={3}>
              <NewTriangle onNew={this.newItem.bind(this)}/>
            </Col>
          </Row>
          <Row className="show-grid">
            <Col sm={12} md={10} mdOffset={1}>
              { this.state.name === '' ? null : <PageHeader className="noscreen"><small>{this.state.name}</small></PageHeader>  }
              <TriangleList items={this.state.items} onDelete={this.deleteItem.bind(this)} onDeleteAll={this.deleteAllItems.bind(this)} />
            </Col>
          </Row>
          <Row className="show-grid">
            <Col className="noprint" xs={10} xsOffset={1} sm={8} smOffset={2} md={6} mdOffset={3}>
              <div></div>
              <PrintIt name={this.state.name} onChange={(e) => {this.setState({name: e.target.value})}}/>
            </Col>
          </Row>
        </Grid>
    );
  }

  newItem(newItem) {
    this.setState((prevState) =>
        ({items: prevState.items.concat(newItem)})
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
