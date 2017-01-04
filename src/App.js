import React, { Component } from 'react';

import './App.css';

import CustomNavbar from './CustomNavbar';
import NewShapeControl from './NewShapeControl';
import ShapeList from './shape_list/ShapeList';
import ShapeControl from './PositionControl'

import { Grid, Row, Col, PageHeader } from 'react-bootstrap';

export default class App extends Component {

  render() {
    return (
      <div>
        <CustomNavbar/>
        <Grid>
            <Row>
                <Col>
                    <PageHeader>Schritt 1 <small>Flächen anlegen</small></PageHeader>
                </Col>
            </Row>
            <Row className="clearfix">
            <Col className="noprint" sm={6}>
              <NewShapeControl/>
            </Col>
            <Col sm={6}>
                <ShapeList deletable={true}/>
            </Col>
          </Row>
            <Row className="clearfix">
                <Col sm={12}>
                    <PageHeader>Schritt 2 <small>Den Positionen die Flächen zuordnen</small></PageHeader>
                    <ShapeControl/>
                </Col>
            </Row>
        </Grid>
      </div>
    );
  }
}