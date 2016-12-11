import React, { Component } from 'react';

import {numToStr} from './util'

import { Table, Button } from 'react-bootstrap';

export default class TrianlgeList extends Component {
    render() {
        return (
            <div>
                <Table striped hover>
                    <thead>
                    <tr>
                        <th>Fläche</th>
                        <th>A</th>
                        <th>B</th>
                        <th>C</th>
                        <th><DeleteAll items={this.props.items} onDeleteAll={this.props.onDeleteAll.bind(this)} /></th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.props.items.map(item =>
                        (<TriangleRow key={item.id} item={item} onDelete={this.props.onDelete.bind(this)} />)
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
                <td><Button bsStyle="link" bsSize="xsmall" onClick={this.handleDelete.bind(this)}>Löschen</Button></td>
            </tr>
        )
    }

    handleDelete() {
        this.props.onDelete(this.props.item);
    }
}

function DeleteAll(props) {
    if (props.items.length > 0) {
        return <Button bsStyle="link" bsSize="xsmall" onClick={props.onDeleteAll.bind(this)}>Alle löschen</Button>;
    } else {
        return <div />
    }
}