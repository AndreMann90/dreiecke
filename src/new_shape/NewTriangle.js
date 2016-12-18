import React, { Component } from 'react';

import NewShape from './NewShape'

export default class NewTriangle extends Component {

    render() {
        const a = 'A:';
        const b = 'B:';
        const c = 'C:';

        const area = values => {
            const s = (values[a] + values[b] + values[c]) / 2;
            return Math.sqrt(s * (s-values[a]) * (s-values[b]) * (s-values[c]));
        };

        const onNew = (newItem, newItemExpaned) => {
            newItem.shape = 'triangle';
            newItem.formula = newItemExpaned[a] + ' | ' + newItemExpaned[b] + ' | ' + newItemExpaned[c];
            this.props.onNew(newItem)
        };

        return (
            <NewShape inputNames={[a, b, c]} headline={'Dreieck (Satz des Heron)'} areaFcn={area} onNew={onNew}/>
        )
    }
}