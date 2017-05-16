import React, { Component } from 'react';

import {FocusableInput, lengthPattern, positivePattern, sumPattern, convenientZeroFcn, AddButton} from './InputElements'
import { Form, Panel } from 'react-bootstrap';

import {strToNum, atLeastTwoDecimals, numToStr} from '../util'


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
                                    name={"Formel:"} value={this.state.formula} onChange={(formula) => this.checkAndComputeSum(formula)} />

                    <FocusableInput  pattern={lengthPattern} preFcn={convenientZeroFcn}
                                     name={"Ergebnis:"} value={this.state.result} onChange={(result) => this.setState({result})} />

                    <AddButton disabled={!this.state.result} />
                </Form>
            </Panel>
        )
    }

    checkAndComputeSum(formula) {
        if(sumPattern.test(formula)) {
            this.setState({formula, result: this.computeSum(formula)})
        } else {
            this.setState({formula})
        }
    }

    computeSum(formula) {
        const result = formula.split("+")
            .map(number => strToNum(number.trim()))
            .reduce((sum, val) => sum + val, 0);
        return atLeastTwoDecimals(numToStr(result))
    }

    formatFormula(formula) {
        return formula.split("+")
            .map(number => atLeastTwoDecimals(number.trim()))
            .join(" + ")
    }

    handleSubmit(e) {
        e.preventDefault();
        let formula;
        let result;
        if(sumPattern.test(this.state.formula)) {
            formula = this.formatFormula(this.state.formula);
            result = this.computeSum(this.state.formula);
        } else {
            formula = this.state.formula;
            result = this.state.result;
        }
        let newShape = {
            areaNumber: parseFloat(this.props.areaNo),
            area: strToNum(result),
            areaStr: result,
            formula,
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