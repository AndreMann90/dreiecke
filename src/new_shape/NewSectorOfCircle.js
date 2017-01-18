import React, { Component } from 'react';
import Isvg from 'react-inlinesvg';

import NewShape from './NewShape'

export default class NewSectorOfCircle extends Component {

    render() {
        const name = "Kreisabschnitt";
        const g = 'G:';
        const h = 'H:';

        const area = values => {
            return (2 / 3) * values[g] * values[h];
        };

        const onNew = (newItem, newItemExpaned) => {
            newItem.shape = <Isvg src={process.env.PUBLIC_URL + "/svg/sectorOfCircle.svg"} cacheGetRequests={true}>{name}</Isvg>;
            newItem.formula = '(2/3) * ' + newItemExpaned[g] + ' * ' + newItemExpaned[h];
            this.props.onNew(newItem)
        };

        return (
            <NewShape inputNames={[g,h]} headline={name} areaFcn={area} onNew={onNew} areaNo={this.props.areaNo} onAreaNoChange={this.props.onAreaNoChange.bind(this)} />
        )
    }
}