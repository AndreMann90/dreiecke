import React, { Component } from 'react';
import { connect } from 'react-redux'
import { addItem, areaNoChanged, areaNoSelector } from './redux/itemList'

import NewTriangle from './new_shape/NewTriangle'
import NewTrapezoid from './new_shape/NewTrapezoid'
import NewRectangle from './new_shape/NewRectangle'
import NewCircle from './new_shape/NewCircle'
import NewSectorOfCircle from './new_shape/NewSectorOfCircle'
import NewRightTriangle from './new_shape/NewRightTriangle'
import CustomShape from './new_shape/CustomShape'

import {Tab, NavItem, Col, Nav, Row} from 'react-bootstrap'

class NewShapeView extends Component {

    render() {
        return (
            <Tab.Container id="left-tabs-example" defaultActiveKey="triangle">
                <Row className="clearfix">
                    <Col sm={4}>
                        <Nav bsStyle="pills" stacked>
                            <NavItem eventKey="triangle">
                                Dreieck
                            </NavItem>
                            <NavItem eventKey="r triangle">
                                Dreieck (rechtwinkling)
                            </NavItem>
                            <NavItem eventKey="trapezoid">
                                Trapez
                            </NavItem>
                            <NavItem eventKey="rectangle">
                                Rechteck
                            </NavItem>
                            <NavItem eventKey="circle">
                                Kreis
                            </NavItem>
                            <NavItem eventKey="sectorOfCircle">
                                Kreisabschnitt
                            </NavItem>
                            <NavItem eventKey="customShape">
                                Eigenes
                            </NavItem>
                        </Nav>
                    </Col>
                    <Col sm={8}>
                        <Tab.Content animation>
                            <Tab.Pane eventKey="triangle">
                                <NewTriangle onNew={this.props.onNew.bind(this)} areaNo={this.props.areaNo} onAreaNoChange={this.props.onAreaNoChange.bind(this)} />
                            </Tab.Pane>
                            <Tab.Pane eventKey="r triangle">
                                <NewRightTriangle onNew={this.props.onNew.bind(this)} areaNo={this.props.areaNo} onAreaNoChange={this.props.onAreaNoChange.bind(this)} />
                            </Tab.Pane>
                            <Tab.Pane eventKey="trapezoid">
                                <NewTrapezoid onNew={this.props.onNew.bind(this)} areaNo={this.props.areaNo} onAreaNoChange={this.props.onAreaNoChange.bind(this)} />
                            </Tab.Pane>
                            <Tab.Pane eventKey="rectangle">
                                <NewRectangle onNew={this.props.onNew.bind(this)} areaNo={this.props.areaNo} onAreaNoChange={this.props.onAreaNoChange.bind(this)} />
                            </Tab.Pane>
                            <Tab.Pane eventKey="circle">
                                <NewCircle onNew={this.props.onNew.bind(this)} areaNo={this.props.areaNo} onAreaNoChange={this.props.onAreaNoChange.bind(this)} />
                            </Tab.Pane>
                            <Tab.Pane eventKey="sectorOfCircle">
                                <NewSectorOfCircle onNew={this.props.onNew.bind(this)} areaNo={this.props.areaNo} onAreaNoChange={this.props.onAreaNoChange.bind(this)} />
                            </Tab.Pane>
                            <Tab.Pane eventKey="customShape">
                                <CustomShape onNew={this.props.onNew.bind(this)} areaNo={this.props.areaNo} onAreaNoChange={this.props.onAreaNoChange.bind(this)} />
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        )
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Connection to store /////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const mapStateToProps = (state) => {
    return {
        areaNo: areaNoSelector(state)
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onNew: (item) => {
            dispatch(addItem(item))
        },
        onAreaNoChange: (areaNo) => {
            dispatch(areaNoChanged(areaNo))
        }
    }
};

const NewShapeControl = connect(
    mapStateToProps,
    mapDispatchToProps
)(NewShapeView);

export default NewShapeControl