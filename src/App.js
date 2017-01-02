import React, { Component } from 'react';

import './App.css';

import CustomNavbar from './CustomNavbar';
import NewShapeControl from './NewShapeControl';
import ShapeList from './ShapeList';

import { Grid, Row, Col } from 'react-bootstrap';

export default class App extends Component {

  render() {
    return (
      <div>
        <CustomNavbar/>
        <Grid>
          <Row className="clearfix">
            <Col className="noprint" sm={6}>
              <NewShapeControl/>
            </Col>
            <Col sm={6}>
                <ShapeList/>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}