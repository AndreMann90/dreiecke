import React, { Component } from 'react';
import DynamicNumber from 'react-dynamic-number';

export default class NewTriangle extends Component {

    decimals = 2;

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.makeEmpty();
    }

    render() {
        return (
            <div>
                <p>Fläche: {this.areaText}</p>
                <form onSubmit={this.handleSubmit}>
                    <DynamicNumber value={this.state.a} onChange={(e, val) => this.setState({a: val})} separator={','} negative={false} />
                    <DynamicNumber value={this.state.b} onChange={(e, val) => this.setState({b: val})} separator={','} negative={false} />
                    <DynamicNumber value={this.state.c} onChange={(e, val) => this.setState({c: val})} separator={','} negative={false} />
                    <button disabled={!isFinite(this.area)}>{'Hinzufügen'}</button>
                </form>
            </div>
        )
    }

    handleSubmit(e) {
        e.preventDefault();
        const newItem = {
            a: this.state.a.toFixed(this.decimals),
            b: this.state.b.toFixed(this.decimals),
            c: this.state.c.toFixed(this.decimals),
            area: this.area.toFixed(this.decimals),
            id: Date.now()
        };
        this.makeEmpty();
        this.props.onNew(newItem);
    }

    makeEmpty() {
        this.state = {a: '', b: '', c: ''};
    }

    get areaText() {
        const a = this.area;
        if(isFinite(a)) {
            return a.toFixed(this.decimals);
        } else {
            return '';
        }
    }

    get area() {
        if(this.state.a === '' || this.state.b === '' || this.state.c === '') {
            return NaN
        } else {
            const s = (this.state.a + this.state.b + this.state.c) / 2;
            return Math.sqrt(s * (s-this.state.a) * (s-this.state.b) * (s-this.state.c));
        }
    }
}