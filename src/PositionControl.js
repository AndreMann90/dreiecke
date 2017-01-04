import React, { Component } from 'react';
import { connect } from 'react-redux'
import { activeKey, positionNameChanged, addPosition, deletePosition } from './redux/positionList'

import ShapeListAdded from './shape_list/ShapeListAdded'
import ShapeListRemaining from './shape_list/ShapeListRemaining'
import { Panel, Tab, Glyphicon, InputGroup, FormControl, Button, Col, NavItem, Row, Nav, Label } from 'react-bootstrap';

const newPositionKey = 'npk';

class ShapeControlView extends Component {

    render() {
        return (
            <Tab.Container activeKey={this.props.activeKey} onSelect={this.handleSelect.bind(this)} id="position-control">
                <Row className="clearfix">
                    <Col sm={4}>
                        <Nav bsStyle="pills" stacked>
                            {this.props.positions.entrySeq().map(entry => {
                                const [key, value] = entry;
                                const buttonStyle = key === this.props.activeKey ? "primary" : "link";
                                return (
                                    <NavItem key={key} eventKey={key}>
                                        <InputGroup>
                                            <FormControl type="text" placeholder={'Position ' + key} value={value} onChange={e => this.props.onNameChange(key, e.target.value)} />
                                            <InputGroup.Button>
                                                <Button bsStyle={buttonStyle} onClick={() => this.props.onDeletePosition(key)}><Glyphicon glyph="remove"/></Button>
                                            </InputGroup.Button>
                                        </InputGroup>
                                    </NavItem>
                                )
                            }).toArray()}
                            <NavItem key={newPositionKey} eventKey={newPositionKey}>
                                <Button bsStyle="link" onClick={this.props.onNewPosition.bind(this)}>Neue Position</Button>
                            </NavItem>
                        </Nav>
                    </Col>
                    <Col sm={8}>
                        <Tab.Content animation>
                            {this.props.positions.entrySeq().map(entry => {
                                const [key, value] = entry;
                                return (
                                    <Tab.Pane key={key} eventKey={key}>
                                        <h4>{this.decorateName(key, value)} <Label>Zugeordnete Flächen</Label></h4>
                                        <ShapeListAdded/>
                                        <Panel style={{marginTop: 50}} header="Flächen zum Zuordnen">
                                            <ShapeListRemaining/>
                                        </Panel>
                                    </Tab.Pane>
                                )
                            }).toArray()}
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        );
    }

    handleSelect(key) {
        if(key !== newPositionKey && key !== this.props.activeKey) {
            this.props.onActiveKeyChanged(key);
        }
    }

    decorateName(key, name) {
        if(name === '') {
            return 'Position ' + key;
        } else {
            return name;
        }
    }
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Connection to store /////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const mapStateToProps = (state) => {
    return {
        activeKey: state.present.positions.get('activeKey'),
        positions: state.present.positions.get('positions')
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onActiveKeyChanged: (key) => {
            dispatch(activeKey(key))
        },
        onNameChange: (key, name) => {
            dispatch(positionNameChanged(key, name))
        },
        onNewPosition: () => {
            dispatch(addPosition())
        },
        onDeletePosition: (position) => {
            dispatch(deletePosition(position))
        }
    }
};

const ShapeControl = connect(
    mapStateToProps,
    mapDispatchToProps
)(ShapeControlView);

export default ShapeControl