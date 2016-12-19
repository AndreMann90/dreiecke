import React, { Component } from 'react';

import NewShape from './NewShape'
import rectangle from './rectangle.svg';

export default class NewRectangle extends Component {

    render() {
        const a = 'A:';
        const b = 'B:';

        const area = values => {
            return values[a] * values[b];
        };

        const onNew = (newItem, newItemExpaned) => {
            newItem.shape = <img src={rectangle} alt="rectangle" />;
            newItem.formula = newItemExpaned[a] + ' * ' + newItemExpaned[b];
            this.props.onNew(newItem)
        };

        return (
            <NewShape inputNames={[a, b]} headline={'Rechteck'} areaFcn={area} onNew={onNew}/>
        )
    }
}