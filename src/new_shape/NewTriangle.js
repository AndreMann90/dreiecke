import React, { Component } from 'react';

import NewShape from './NewShape'
import triangle from './triangle.svg';

export default class NewTriangle extends Component {

    render() {
        const name = "Dreieck";
        const a = 'A:';
        const b = 'B:';
        const c = 'C:';

        const area = values => {
            const s = (values[a] + values[b] + values[c]) / 2;
            return Math.sqrt(s * (s-values[a]) * (s-values[b]) * (s-values[c]));
        };

        const onNew = (newItem, newItemExpaned) => {
            newItem.shape = <img src={triangle} alt={name} />;
            newItem.formula = newItemExpaned[a] + ' | ' + newItemExpaned[b] + ' | ' + newItemExpaned[c];
            this.props.onNew(newItem)
        };

        return (
            <NewShape inputNames={[a, b, c]} headline={name} areaFcn={area} onNew={onNew} areaNo={this.props.areaNo} onAreaNoChange={this.props.onAreaNoChange.bind(this)} />
        )
    }
}