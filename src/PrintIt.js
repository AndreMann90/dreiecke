import React, { Component } from 'react';

import { Button, FormGroup, FormControl, InputGroup, HelpBlock, Panel } from 'react-bootstrap';


export default class PrintIt extends Component {

    render() {
        const marginTop = {
            marginTop: 33
        };
        return (
            <Panel style={marginTop} header="Tabelle drucken">
                <form onSubmit={() => window.print()}>
                    <FormGroup>
                        <InputGroup>
                            <FormControl type="text" value={this.props.name} onChange={this.props.onChange.bind(this)} />
                            <InputGroup.Button>
                                <Button type="submit">Drucken</Button>
                            </InputGroup.Button>
                        </InputGroup>
                        <HelpBlock>Gebe hier den Namen der Baustelle ein. (Optional)</HelpBlock>
                    </FormGroup>
                </form>
            </Panel>
        )
    }

}