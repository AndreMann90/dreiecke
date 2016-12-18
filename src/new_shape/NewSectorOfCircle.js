import React, { Component } from 'react';

import NewShape from './NewShape'

export default class NewSectorOfCircle extends Component {

    render() {
        const g = 'G:';
        const h = 'H:';

        const area = values => {
            return (2 / 3) * values[g] * values[h];
        };

        const onNew = (newItem, newItemExpaned) => {
            newItem.shape = 'sectorOfCircle';
            newItem.formula = '(2/3) * ' + newItemExpaned[g] + ' * ' + newItemExpaned[h];
            this.props.onNew(newItem)
        };

        return (
            <NewShape inputNames={[g,h]} headline={'Kreisabschnitt'} areaFcn={area} onNew={onNew}/>
        )
    }
}