import React, { Component } from 'react';
import Isvg from 'react-inlinesvg';

import NewShape from './NewShape'

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
            newItem.shape = <Isvg src={process.env.PUBLIC_URL + "/svg/triangle.svg"} cacheGetRequests={true}>{name}</Isvg>;
            newItem.formula = newItemExpaned[a] + ' | ' + newItemExpaned[b] + ' | ' + newItemExpaned[c];
            this.props.onNew(newItem)
        };

        return (
            <NewShape inputNames={[a, b, c]} headline={name} areaFcn={area} onNew={onNew} areaNo={this.props.areaNo} onAreaNoChange={this.props.onAreaNoChange.bind(this)} />
        )
    }
}