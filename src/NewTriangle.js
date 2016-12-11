import React, { Component } from 'react';
import DynamicNumber from 'react-dynamic-number';

import {numToStr} from './util'

import { Button, Glyphicon, Form, FormGroup, Col, ControlLabel, Panel } from 'react-bootstrap';

export default class NewTriangle extends Component {

    constructor(props) {
        super(props);
        this.makeEmpty();
    }

    render() {
        return (
            <Panel header={'Neues Dreieck (Satz des Heron)'} bsStyle="primary">
                <Form horizontal onSubmit={(e) => this.handleSubmit(e)}>

                    <LengthInput name="A:" value={this.state.a} onChange={(e, val) => this.setState({a: val})} />
                    <LengthInput name="B:" value={this.state.b} onChange={(e, val) => this.setState({b: val})} />
                    <LengthInput name="C:" value={this.state.c} onChange={(e, val) => this.setState({c: val})} />

                    <TextGroup name="Fläche:" text={this.areaText} />

                    <FormGroup>
                        <Col smOffset={2} sm={10}>
                            <Button bsStyle="primary" type="submit" disabled={!isFinite(this.area)}><Glyphicon glyph="plus"/>{' Hinzufügen'}</Button>
                        </Col>
                    </FormGroup>
                </Form>
            </Panel>
        )
    }

    handleSubmit(e) {
        e.preventDefault();
        const newItem = {
            a: numToStr(this.state.a),
            b: numToStr(this.state.b),
            c: numToStr(this.state.c),
            area: this.area,
            areaStr: numToStr(this.area),
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
            return numToStr(a);
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

function LengthInput(props) {
    return (
        <FormGroup >
            <Col componentClass={ControlLabel} sm={2}>
                {props.name}
            </Col>
            <Col sm={10}>
                <DynamicNumber className="form-control" value={props.value} onChange={props.onChange} separator={','} negative={false} />
            </Col>
        </FormGroup>
    )
}

function TextGroup(props) {
    return (
        <FormGroup >
            <Col componentClass={ControlLabel} sm={2}>
                {props.name}
            </Col>
            <Col sm={10}>
                {props.text}
            </Col>
        </FormGroup>
    )
}