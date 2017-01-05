import React, { Component } from 'react';
import { connect } from 'react-redux'
import { addItem, areaNoChanged, areaNoSelector } from './redux/itemList'

import NewTriangle from './new_shape/NewTriangle'
import NewTrapezoid from './new_shape/NewTrapezoid'
import NewRectangle from './new_shape/NewRectangle'
import NewCircle from './new_shape/NewCircle'
import NewSectorOfCircle from './new_shape/NewSectorOfCircle'
import NewRightTriangle from './new_shape/NewRightTriangle'

import {Tab, NavItem, Col, Nav, Row} from 'react-bootstrap'

class NewShapeView extends Component {

    render() {
        return (
            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                <Row className="clearfix">
                    <Col sm={4}>
                        <Nav bsStyle="pills" stacked>
                            <NavItem eventKey="first">
                                Dreieck
                            </NavItem>
                            <NavItem eventKey="second">
                                Trapez
                            </NavItem>
                            <NavItem eventKey="third">
                                Rechteck
                            </NavItem>
                            <NavItem eventKey="forth">
                                Kreis
                            </NavItem>
                            <NavItem eventKey="fifth">
                                Kreisabschnitt
                            </NavItem>
                            <NavItem eventKey="sixth">
                                Dreieck (rechtwinkling)
                            </NavItem>
                        </Nav>
                    </Col>
                    <Col sm={8}>
                        <Tab.Content animation>
                            <Tab.Pane eventKey="first">
                                <NewTriangle onNew={this.props.onNew.bind(this)} areaNo={this.props.areaNo} onAreaNoChange={this.props.onAreaNoChange.bind(this)} />
                            </Tab.Pane>
                            <Tab.Pane eventKey="second">
                                <NewTrapezoid onNew={this.props.onNew.bind(this)} areaNo={this.props.areaNo} onAreaNoChange={this.props.onAreaNoChange.bind(this)} />
                            </Tab.Pane>
                            <Tab.Pane eventKey="third">
                                <NewRectangle onNew={this.props.onNew.bind(this)} areaNo={this.props.areaNo} onAreaNoChange={this.props.onAreaNoChange.bind(this)} />
                            </Tab.Pane>
                            <Tab.Pane eventKey="forth">
                                <NewCircle onNew={this.props.onNew.bind(this)} areaNo={this.props.areaNo} onAreaNoChange={this.props.onAreaNoChange.bind(this)} />
                            </Tab.Pane>
                            <Tab.Pane eventKey="fifth">
                                <NewSectorOfCircle onNew={this.props.onNew.bind(this)} areaNo={this.props.areaNo} onAreaNoChange={this.props.onAreaNoChange.bind(this)} />
                            </Tab.Pane>
                            <Tab.Pane eventKey="sixth">
                                <NewRightTriangle onNew={this.props.onNew.bind(this)} areaNo={this.props.areaNo} onAreaNoChange={this.props.onAreaNoChange.bind(this)} />
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