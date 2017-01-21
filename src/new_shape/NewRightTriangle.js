import React, { Component } from 'react';

import NewShape from './NewShape'

export default class NewRightTriangle extends Component {

    render() {
        const name = "Dreieck (rechtwinklig)";
        const a = 'A:';
        const b = 'B:';

        const area = values => {
            return values[a] * values[b] / 2;
        };

        const onNew = (newItem, newItemExpaned) => {
            newItem.shape = "right-rectangle";
            newItem.formula = '(' + newItemExpaned[a] + ' * ' + newItemExpaned[b] + ') / 2';
            this.props.onNew(newItem)
        };

        return (
            <NewShape inputNames={[a, b]} headline={name} areaFcn={area} onNew={onNew} areaNo={this.props.areaNo} onAreaNoChange={this.props.onAreaNoChange.bind(this)} />
        )
    }
}