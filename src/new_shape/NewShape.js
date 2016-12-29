import React, { Component } from 'react';

import {numToStr, strToNum, atLeastTwoDecimals} from '../util'

import { Button, Glyphicon, Form, FormGroup, Col, ControlLabel, FormControl, Panel } from 'react-bootstrap';

const labelWidth = 3;
const controlWidth = 9;

/**
 * Generic form for new shapes.
 *
 * Props:
 * <ul>
 *   <li>inputNames: a list of sting with the names of the input field</li>
 *   <li>headline: string for headline of panel</li>
 *   <li>areaNo: a integer with the area number</li>
 *   <li>onAreaNoChange: a callback-function for the area number</li>
 *   <li>areaFcn: a function to compute the area of the concrete shape. Input is one object that has the inputNames
 *                as property names each with a positive float as property value </li>
 *   <li>onNew: a callback-function with the new shape as argument</li>
 * </ul>
 */
export default class NewShape extends Component {

    constructor(props) {
        super(props);
        this.emptyState = this.props.inputNames.reduce((obj, v) => {obj[v] = ''; return obj}, {});
        this.state = this.emptyState;
    }

    render() {
        const first = this.props.inputNames[0];
        if(!first) {
            throw new Error('Form without any input')
        }
        return (
            <Panel header={this.props.headline} bsStyle="primary">
                <Form horizontal onSubmit={(e) => this.handleSubmit(e)}>

                    <PositiveInput name={'Fl.Nr.:'} value={this.props.areaNo} onChange={this.props.onAreaNoChange} />

                    <LengthInput ref={(input) => { this.textInput = input; }}
                                 name={first} value={this.state[first]} onChange={(val) => this.setState({[first]: val})} />

                    {this.props.inputNames.slice(1).map((n) =>
                        (<LengthInput key={n} name={n} value={this.state[n]} onChange={(val) => this.setState({[n]: val})} />)
                    )}

                    <TextGroup name="Fläche:" text={this.areaText} />

                    <FormGroup>
                        <Col smOffset={labelWidth} sm={controlWidth}>
                            <Button bsStyle="primary" type="submit" disabled={!isFinite(this.area)}>
                                <Glyphicon glyph="plus"/>{' Hinzufügen'}
                            </Button>
                        </Col>
                    </FormGroup>
                </Form>
            </Panel>
        )
    }

    handleSubmit(e) {
        e.preventDefault();
        let newShape = {
            areaNumber: parseFloat(this.props.areaNo),
            area: this.area,
            areaStr: numToStr(this.area),
            id: Date.now()
        };
        let newShapeExpanded = this.props.inputNames.reduce((obj, v) => {obj[v] = atLeastTwoDecimals(this.state[v]); return obj}, {} );
        this.setState(this.emptyState);
        this.props.onNew(newShape, newShapeExpanded);
        this.textInput.focus();
    }

    get areaText() {
        if(this.props.inputNames.some(n => this.state[n] === '')) {
            return '';
        } else {
            const a = this.area;
            if(isFinite(a)) {
                return numToStr(a);
            } else {
                return 'Ungültig';
            }
        }
    }

    get area() {
        const values = this.props.inputNames.reduce((obj, v) => {obj[v] = strToNum(this.state[v]); return obj}, {} );
        return this.props.areaFcn(values);
    }
}

NewShape.propTypes = {
    inputNames: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
    headline: React.PropTypes.node.isRequired,
    areaNo: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]).isRequired,
    onAreaNoChange: React.PropTypes.func.isRequired,
    areaFcn: React.PropTypes.func.isRequired,
    onNew: React.PropTypes.func.isRequired
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Internal Classes ////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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
        const val = e.target.value;
        if(val === ',') {
            this.props.onChange('0,');
        } else if(/^[0-9]*[,]?[0-9]{0,2}$/.test(val)) {
            this.props.onChange(val);
        }
    }
}


class PositiveInput extends Component {

    render() {
        return (
            <FormGroup >
                <Col componentClass={ControlLabel} sm={labelWidth}>
                    {this.props.name}
                </Col>
                <Col sm={controlWidth}>
                    <input
                        type="text" className="form-control" value={this.props.value} onChange={this.onChange.bind(this)}/>
                </Col>
            </FormGroup>
        )
    }

    onChange(e) {
        const val = e.target.value;
        if(/^[0-9]*$/.test(val)) {
            this.props.onChange(val);
        }
    }
}


function TextGroup(props) {
    return (
        <FormGroup >
            <Col componentClass={ControlLabel} sm={labelWidth}>
                {props.name}
            </Col>
            <Col sm={controlWidth}>
                <FormControl.Static>
                    {props.text}
                </FormControl.Static>
            </Col>
        </FormGroup>
    )
}