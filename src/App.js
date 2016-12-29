import React, { Component } from 'react';
import './App.css';
import CustomNavbar from './CustomNavbar';
import NewShapeControl from './NewShapeControl';
import ShapeList from './ShapeList';

import { PageHeader, Grid, Row, Col } from 'react-bootstrap';
import Immutable from 'immutable'

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {items: Immutable.List(), name: '', areaNo: 1};
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
              <NewShapeControl onNew={this.newItem.bind(this)} areaNo={this.state.areaNo} onAreaNoChange={an => this.setState({areaNo: an})} />
            </Col>
            <Col sm={6}>
                <ShapeList items={this.state.items} onDelete={this.deleteItem.bind(this)} onDeleteAll={this.deleteAllItems.bind(this)} />
            </Col>
          </Row>
        </Grid>
    );
  }

  newItem(newItem) {
      const key = this.state.items.findLastKey(item => {
          return (item.areaNumber <= newItem.areaNumber)
      });
      // empty list or push new item (which is last item)
      if(key == null || (key + 1) === this.state.items.size) { // a note on key == null: true iff key is undefined or null. The expression !key is true for 0 either. (Took me as Javascript Newbie quiet a while to find out that this was the bug I was searching for)
          this.setState((prevState) => {
              return ({items: prevState.items.push(newItem),
                  areaNo: parseFloat(prevState.areaNo) + 1})
          });
      // insert item into the by area number ordered list
      } else {
          this.setState((prevState) => {
              return ({items: prevState.items.insert((key + 1), newItem),
                       areaNo: parseFloat(prevState.areaNo) + 1})
          });
      }
  }

  deleteItem(item) {
      const index = this.state.items.indexOf(item);
      this.setState((prevState) =>
          ({items: prevState.items.delete(index)})
      );
  }

  deleteAllItems() {
      this.setState((prevState) =>
          ({items: prevState.items.clear(),
            areaNo: 1})
      );
  }
}

export default App;
