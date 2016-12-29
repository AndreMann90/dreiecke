import React, {Component} from 'react';
import { Navbar, Nav, NavItem, FormGroup, FormControl, Button } from 'react-bootstrap';

export default class CustomNavbar extends Component {

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
                <form onSubmit={() => window.print()}>
                    <Navbar.Form pullLeft>
                        <FormGroup>
                            <FormControl type="text" placeholder="Name der Baustelle"
                                         value={this.props.name} onChange={this.props.onChange.bind(this)}/>
                        </FormGroup>
                        {' '}
                        <Button type="submit">Drucken</Button>
                    </Navbar.Form>
                </form>
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