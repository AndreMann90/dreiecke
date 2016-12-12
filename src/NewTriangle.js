import React, { Component } from 'react';

import {numToStr, strToNum, atLeastTwoDecimals} from './util'

import { Button, Glyphicon, Form, FormGroup, Col, ControlLabel, FormControl, Panel } from 'react-bootstrap';

export default class NewTriangle extends Component {

    emptyState = {a: '', b: '', c: ''};

    constructor(props) {
        super(props);
        this.state = this.emptyState;
    }

    render() {
        return (
            <Panel header={'Neues Dreieck (Satz des Heron)'} bsStyle="primary">
                <Form horizontal onSubmit={(e) => this.handleSubmit(e)}>

                    <LengthInput name="A:" value={this.state.a} onChange={(val) => this.setState({a: val})}
                                 ref={(input) => { this.textInput = input; }} />
                    <LengthInput name="B:" value={this.state.b} onChange={(val) => this.setState({b: val})} />
                    <LengthInput name="C:" value={this.state.c} onChange={(val) => this.setState({c: val})} />

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
            a: atLeastTwoDecimals(this.state.a),
            b: atLeastTwoDecimals(this.state.b),
            c: atLeastTwoDecimals(this.state.c),
            area: this.area,
            areaStr: numToStr(this.area),
            id: Date.now()
        };
        this.setState(this.emptyState);
        this.props.onNew(newItem);
        this.textInput.focus();
    }

    get areaText() {
        const a = this.area;
        if(isFinite(a)) {
            return numToStr(a);
        } else if(this.state.a === '' || this.state.b === '' || this.state.c === '') {
            return ''
        } else {
            return 'Ungültig';
        }
    }

    get area() {
        if(this.state.a === '' || this.state.b === '' || this.state.c === '') {
            return NaN
        } else {
            const a = strToNum(this.state.a);
            const b = strToNum(this.state.b);
            const c = strToNum(this.state.c);
            const s = (a + b + c) / 2;
            return Math.sqrt(s * (s-a) * (s-b) * (s-c));
        }
    }
}

class LengthInput extends Component {

    constructor(props) {
        super(props);
        this.focus = this.focus.bind(this);
    }

    focus() {
        this.textInput.focus();
    }

    render() {
        return (
            <FormGroup >
                <Col componentClass={ControlLabel} sm={2}>
                    {this.props.name}
                </Col>
                <Col sm={10}>
                    <input
                        type="text" className="form-control" value={this.props.value}
                        ref={(input) => { this.textInput = input; }}
                        onChange={this.onChange.bind(this)}/>
                </Col>
            </FormGroup>
        )
    }

    onChange(e) {
        const val = e.target.value;
        if(/^[0-9]+[,]?[0-9]{0,2}$/.test(val)) {
            this.props.onChange(val);
        }
    }
}



function TextGroup(props) {
    return (
        <FormGroup >
            <Col componentClass={ControlLabel} sm={2}>
                {props.name}
            </Col>
            <Col sm={10}>
                <FormControl.Static>
                    {props.text}
                </FormControl.Static>
            </Col>
        </FormGroup>
    )
}