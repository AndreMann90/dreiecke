import React, {Component} from 'react';
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import { ActionCreators } from 'redux-undo';
import { nameChanged, nameSelector } from './redux/name'
import { printPreviewLinkSelector } from './redux/id'

import { Navbar, Nav, NavItem, FormGroup, FormControl, Button } from 'react-bootstrap';

class CustomNavbarView extends Component {

    shouldComponentUpdate(nextProps) {
        return this.props.name !== nextProps.name;
    }

    render() {
      return (
        <Navbar>
            <Navbar.Header>
                <Navbar.Brand>
                    <a href="#">Baustellenaufmaße</a>
                </Navbar.Brand>
                <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
                <Navbar.Form pullLeft>
                    <FormGroup>
                        <FormControl type="text" placeholder="Name der Baustelle"
                                     value={this.props.name} onChange={this.props.onNameChange.bind(this)}/>
                    </FormGroup>
                </Navbar.Form>
                <Navbar.Form pullRight>
                    <Button onClick={() => browserHistory.push(this.props.printPreviewLink)}>Zur Druckansicht</Button>
                </Navbar.Form>
                <Nav pullRight onSelect={this.undoRedo.bind(this)}>
                    <NavItem eventKey={1}>Rückgängig</NavItem>
                    <NavItem eventKey={2}>Wiederholen</NavItem>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
      )
    }

    undoRedo(eventKey) {
        if(eventKey === 1) {
            this.props.undo()
        } else if(eventKey === 2){
            this.props.redo();
        }
    }
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Connection to store /////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const mapStateToProps = (state) => {
    return {
        name: nameSelector(state),
        printPreviewLink: printPreviewLinkSelector(state)
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        undo: () => {
            dispatch(ActionCreators.undo())
        },
        redo: () => {
            dispatch(ActionCreators.redo())
        },
        onNameChange: (nameEvent) => {
            dispatch(nameChanged(nameEvent.target.value))
        }
    }
};

const CustomNavbar = connect(
    mapStateToProps,
    mapDispatchToProps
)(CustomNavbarView);

export default CustomNavbar;
