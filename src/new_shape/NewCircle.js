import React, { Component } from 'react';

import NewShape from './NewShape'
import circle from './circle.svg';

export default class NewCircle extends Component {

    render() {
        const r = 'R:';

        const area = values => {
            return Math.PI * values[r] * values[r];
        };

        const onNew = (newItem, newItemExpaned) => {
            newItem.shape = <img src={circle} alt="circle" />;
            newItem.formula = 'Pi * ' + newItemExpaned[r] + '^2';
            this.props.onNew(newItem)
        };

        return (
            <NewShape inputNames={[r]} headline={'Kreis'} areaFcn={area} onNew={onNew}/>
        )
    }
}