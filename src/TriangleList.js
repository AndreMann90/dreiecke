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
                        (<TriangleRow key={item.id} item={item} />)
                    )}
                    </tbody>
                </Table>
                <p><strong>Gesamt: {numToStr(this.props.items.reduce((sum, i) => (sum+parseFloat(i.area)), 0))}</strong></p>
            </div>
        );
    }
}

class TriangleRow extends Component {
    render() {
        return (
            <tr>
                <td>{this.props.item.areaStr}</td>
                <td>{this.props.item.a}</td>
                <td>{this.props.item.b}</td>
                <td>{this.props.item.c}</td>
            </tr>
        )
    }
}