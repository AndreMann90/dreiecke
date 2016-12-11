import React, { Component } from 'react';
import './App.css';
import NewTriangle from './NewTriangle';
import TrianlgeList from './TriangleList';

import { PageHeader, Grid, Row, Col } from 'react-bootstrap';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {items: []};
  }

  render() {
    return (
      <div>
        <Grid>
          <Row className="show-grid">
            <Col md={10} mdOffset={1} sm={12} >
              <PageHeader>Dreiecksrechner <small>für Baustellenaufmaße</small></PageHeader>
            </Col>
          </Row>
          <Row className="show-grid">
            <Col sm={10} smOffset={1} md={8} mdOffset={2}>
              <NewTriangle onNew={this.newItem.bind(this)}/>
            </Col>
          </Row>
          <Row className="show-grid">
            <Col sm={12} md={10} mdOffset={1}>
              <TrianlgeList items={this.state.items} />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }

  newItem(newItem) {
    this.setState((prevState) =>
        ({items: prevState.items.concat(newItem)})
    );
  }
}

export default App;
