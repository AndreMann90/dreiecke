import React, { Component } from 'react';

import { Button, Glyphicon, FormGroup, Col, ControlLabel, FormControl } from 'react-bootstrap';

const labelWidth = 3;
const controlWidth = 9;

export const positivePattern = /^[0-9]*$/;
export const lengthPattern = /^[0-9]*[,]?[0-9]{0,2}$/;
export const intPattern = /^[-]?[0-9]*[,]?[0-9]{0,2}$/;
export const sumPattern = /^[0-9]+[,]?[0-9]*([\s]*[+][\s]*[0-9]+[,]?[0-9]*)*$/;

export function convenientZeroFcn(x) {
    return x === ',' ? '0,' : x;
}

export class FocusableInput extends Component {

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
                <Col componentClass={ControlLabel} sm={labelWidth}>
                    {this.props.name}
                </Col>
                <Col sm={controlWidth}>
                    <input
                        type="text" className="form-control" value={this.props.value}
                        ref={(input) => { this.textInput = input; }}
                        onChange={this.onChange.bind(this)}/>
                </Col>
            </FormGroup>
        )
    }

    onChange(e) {
        let val = e.target.value;
        if(this.props.preFcn != null) {
            val = this.props.preFcn(val);
        }
        if(this.props.pattern == null || this.props.pattern.test(val)) {
            this.props.onChange(val);
        }
    }
}

export function TextGroup(props) {
    return (
        <FormGroup >
            <Col componentClass={ControlLabel} sm={labelWidth}>
                {props.name}
            </Col>
            <Col sm={controlWidth - 2}>
                <FormControl.Static>
                    {props.text}
                </FormControl.Static>
            </Col>
            <Col sm={2}>
                <Button bsSize="small" disabled={!props.text} onClick={props.onClick.bind(this)}>
                    <Glyphicon glyph="minus"/>
                </Button>
            </Col>
        </FormGroup>
    )
}


export function AddButton(props) {
    return (
        <FormGroup>
            <Col smOffset={labelWidth} sm={controlWidth}>
                <Button bsStyle="primary" type="submit" disabled={props.disabled}>
                    <Glyphicon glyph="plus"/>{' Hinzufügen'}
                </Button>
            </Col>
        </FormGroup>
    )
}