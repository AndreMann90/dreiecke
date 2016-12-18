import React from 'react';
import { Navbar, FormGroup, FormControl, Button } from 'react-bootstrap';

export default function (props) {
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
                                         value={props.name} onChange={props.onChange.bind(this)}/>
                        </FormGroup>
                        {' '}
                        <Button type="submit">Drucken</Button>
                    </Navbar.Form>
                </form>
            </Navbar.Collapse>
        </Navbar>
    )
}