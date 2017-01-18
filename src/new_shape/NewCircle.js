import React, { Component } from 'react';
import Isvg from 'react-inlinesvg';

import NewShape from './NewShape'


export default class NewCircle extends Component {

    render() {
        const name = "Kreis";
        const r = 'R:';

        const area = values => {
            return Math.PI * values[r] * values[r];
        };

        const onNew = (newItem, newItemExpaned) => {
            newItem.shape = <Isvg src={process.env.PUBLIC_URL + "/svg/circle.svg"} cacheGetRequests={true}>{name}</Isvg>;
            newItem.formula = 'Pi * ' + newItemExpaned[r] + '^2';
            this.props.onNew(newItem)
        };

        return (
            <NewShape inputNames={[r]} headline={name} areaFcn={area} onNew={onNew} areaNo={this.props.areaNo} onAreaNoChange={this.props.onAreaNoChange.bind(this)} />
        )
    }
}