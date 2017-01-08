import React, { Component } from 'react';

import {FocusableInput, lengthPattern, positivePattern, convenientZeroFcn, AddButton} from './InputElements'
import { Form, Panel } from 'react-bootstrap';

import {strToNum} from '../util'


export default class CustomShape extends Component {

    constructor(props) {
        super(props);
        this.emptyState = {result : '', formula: ''};
        this.state = this.emptyState;
    }

    render() {
        return (
            <Panel header={"Eigene Form"} bsStyle="primary">
                <Form horizontal onSubmit={(e) => this.handleSubmit(e)}>

                    <FocusableInput pattern={positivePattern}
                                    name={'Fl.Nr.:'} value={this.props.areaNo} onChange={this.props.onAreaNoChange} />

                    <FocusableInput ref={(input) => { this.textInput = input; }}
                                    name={"Formel:"} value={this.state.formula} onChange={(formula) => this.setState({formula})} />

                    <FocusableInput  pattern={lengthPattern} preFcn={convenientZeroFcn}
                                     name={"Ergebnis:"} value={this.state.result} onChange={(result) => this.setState({result})} />

                    <AddButton disabled={!this.state.result} />
                </Form>
            </Panel>
        )
    }

    handleSubmit(e) {
        e.preventDefault();
        let newShape = {
            areaNumber: parseFloat(this.props.areaNo),
            area: strToNum(this.state.result),
            areaStr: this.state.result,
            formula: this.state.formula,
            shape : '',
            id: Date.now()
        };
        this.setState(this.emptyState);
        this.props.onNew(newShape);
        this.textInput.focus();
    }
}

CustomShape.propTypes = {
    areaNo: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]).isRequired,
    onAreaNoChange: React.PropTypes.func.isRequired,
    onNew: React.PropTypes.func.isRequired
};