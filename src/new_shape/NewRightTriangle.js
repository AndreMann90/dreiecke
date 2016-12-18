import React, { Component } from 'react';

import NewShape from './NewShape'

export default class NewRightTriangle extends Component {

    render() {
        const a = 'A:';
        const b = 'B:';

        const area = values => {
            return values[a] * values[b] / 2;
        };

        const onNew = (newItem, newItemExpaned) => {
            newItem.shape = 'rightTriangle';
            newItem.formula = '(' + newItemExpaned[a] + ' * ' + newItemExpaned[b] + ') / 2';
            this.props.onNew(newItem)
        };

        return (
            <NewShape inputNames={[a, b]} headline={'Rechtwinkliges Rechteck'} areaFcn={area} onNew={onNew}/>
        )
    }
}