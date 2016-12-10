import React, { Component } from 'react';

export default class TrianlgeList extends Component {
    render() {
        return (
            <div>
                <ul>
                    {this.props.items.map(item =>
                        (<li key={item.id}>{item.area} (a={item.a}, b={item.b}, c={item.c})</li>)
                    )}
                </ul>
                <p>Gesamt: {this.props.items.reduce((sum, i) => (sum+parseFloat(i.area)), 0)}</p>
            </div>
        );
    }
}