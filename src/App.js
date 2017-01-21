import React, { Component } from 'react';
import { connect } from 'react-redux'
import { setId } from './redux/id'

import CustomNavbar from './CustomNavbar';
import NewShapeControl from './NewShapeControl';
import ShapeList from './shape_list/ShapeList';
import ShapeControl from './PositionControl'
import Foot from './Foot'
import Alert from './Alert'

import { Grid, Row, Col, PageHeader } from 'react-bootstrap';

class AppView extends Component {

  componentDidMount() {
      this.props.setId(this.props.params.id);
  }

  render() {
    return (
      <div>
        <CustomNavbar className="noprint"/>
        <Grid className="noprint">
            <Row>
                <Col>
                    <Alert/>
                    <PageHeader>Schritt 1 <small>Flächen anlegen</small></PageHeader>
                </Col>
            </Row>
            <Row className="clearfix">
            <Col sm={6}>
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
            <Row className="clearfix">
                <Col sm={12}>
                    <PageHeader/>
                    <Foot/>
                </Col>
            </Row>
        </Grid>
      </div>
    );
  }
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Connection to store /////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const mapStateToProps = (state) => {
    return {
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        setId: (id) => {
            dispatch(setId(id))
        }
    }
};

const App = connect(
    mapStateToProps,
    mapDispatchToProps
)(AppView);

export default App;