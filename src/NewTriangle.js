import React, { Component } from 'react';
import DynamicNumber from 'react-dynamic-number';

import {numToStr} from './util'

import { Button, Glyphicon, Form, FormGroup, Col, ControlLabel, FormControl, Panel } from 'react-bootstrap';

export default class NewTriangle extends Component {

    constructor(props) {
        super(props);
        this.makeEmpty();
    }

    render() {
        return (
            <Panel header={'Neues Dreieck (Satz des Heron)'} bsStyle="primary">
                <Form horizontal onSubmit={(e) => this.handleSubmit(e)}>
                    <FormGroup controlId="formHorizontalEmail" >
                        <Col componentClass={ControlLabel} sm={2}>
                            A:
                        </Col>
                        <Col sm={10}>
                            <DynamicNumber className="form-control" value={this.state.a} onChange={(e, val) => this.setState({a: val})} separator={','} negative={false} />
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="formHorizontalEmail">
                        <Col componentClass={ControlLabel} sm={2}>
                            B:
                        </Col>
                        <Col sm={10}>
                            <DynamicNumber className="form-control" value={this.state.b} onChange={(e, val) => this.setState({b: val})} separator={','} negative={false} />
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="formHorizontalEmail">
                        <Col componentClass={ControlLabel} sm={2}>
                            C:
                        </Col>
                        <Col sm={10}>
                            <DynamicNumber className="form-control" value={this.state.c} onChange={(e, val) => this.setState({c: val})} separator={','} negative={false} />
                        </Col>
                    </FormGroup>

                    <FormGroup>
                        <Col componentClass={ControlLabel} sm={2}>
                            Fläche:
                        </Col>
                        <Col sm={10}>
                            <FormControl.Static>
                                {this.areaText}
                            </FormControl.Static>
                        </Col>
                    </FormGroup>

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