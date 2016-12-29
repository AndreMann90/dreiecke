import React, { Component } from 'react';

import NewShape from './NewShape'
import sectorOfCircle from './sectorOfCircle.svg'

export default class NewSectorOfCircle extends Component {

    render() {
        const name = "Kreisabschnitt";
        const g = 'G:';
        const h = 'H:';

        const area = values => {
            return (2 / 3) * values[g] * values[h];
        };

        const onNew = (newItem, newItemExpaned) => {
            newItem.shape = <img src={sectorOfCircle} alt={name} />;
            newItem.formula = '(2/3) * ' + newItemExpaned[g] + ' * ' + newItemExpaned[h];
            this.props.onNew(newItem)
        };

        return (
            <NewShape inputNames={[g,h]} headline={name} areaFcn={area} onNew={onNew} areaNo={this.props.areaNo} onAreaNoChange={this.props.onAreaNoChange.bind(this)} />
        )
    }
}