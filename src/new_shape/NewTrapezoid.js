import React, { Component } from 'react';

import NewShape from './NewShape'

export default class NewTrapezoid extends Component {

    render() {
        const name = "Trapez";
        const a = 'A:';
        const b = 'B:';
        const c = 'C:';

        const area = values => {
            return (values[a] + values[b]) / 2 * values[c];
        };

        const onNew = (newItem, newItemExpaned) => {
            newItem.shape = "trapezoid";
            newItem.formula = '(' + newItemExpaned[a] + ' + ' + newItemExpaned[b] + ') / 2 * ' + newItemExpaned[c];
            this.props.onNew(newItem)
        };

        return (
            <NewShape inputNames={[a, b, c]} headline={name} areaFcn={area} onNew={onNew} areaNo={this.props.areaNo} onAreaNoChange={this.props.onAreaNoChange.bind(this)} />
        )
    }
}