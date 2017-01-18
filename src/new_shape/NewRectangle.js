import React, { Component } from 'react';
import Isvg from 'react-inlinesvg';

import NewShape from './NewShape'

export default class NewRectangle extends Component {

    render() {
        const name = "Rechteck";
        const a = 'A:';
        const b = 'B:';

        const area = values => {
            return values[a] * values[b];
        };

        const onNew = (newItem, newItemExpaned) => {
            newItem.shape = <Isvg src={process.env.PUBLIC_URL + "/svg/rectangle.svg"} cacheGetRequests={true}>{name}</Isvg>;
            newItem.formula = newItemExpaned[a] + ' * ' + newItemExpaned[b];
            this.props.onNew(newItem)
        };

        return (
            <NewShape inputNames={[a, b]} headline={name} areaFcn={area} onNew={onNew} areaNo={this.props.areaNo} onAreaNoChange={this.props.onAreaNoChange.bind(this)} />
        )
    }
}