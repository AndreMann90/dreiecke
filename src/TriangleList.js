import React, { Component } from 'react';

import {numToStr} from './util'

import { Table } from 'react-bootstrap';

export default class TrianlgeList extends Component {
    render() {
        return (
            <div>
                <Table striped bordered condensed hover>
                    <thead>
                    <tr>
                        <th>Fläche</th>
                        <th>A</th>
                        <th>B</th>
                        <th>C</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.props.items.map(item =>
                        (<tr key={item.id}><td>{item.areaStr}</td><td>{item.a}</td><td>{item.b}</td><td>{item.c}</td></tr>)
                    )}
                    </tbody>
                </Table>
                <p><strong>Gesamt: {numToStr(this.props.items.reduce((sum, i) => (sum+parseFloat(i.area)), 0))}</strong></p>
            </div>
        );
    }
}