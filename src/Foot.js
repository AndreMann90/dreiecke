import React, { Component } from 'react';
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { ActionCreators } from 'redux-undo';

import {Button } from 'react-bootstrap';

class FootView extends Component {

    render() {
        return (
            <p style={{textAlign: 'right'}}>
                <span>
                    <Button bsStyle="link" onClick={() => this.props.undo()}>Rückgängig</Button>
                    <Button bsStyle="link" onClick={() => this.props.redo()}>Wiederholen</Button>
                    <Button onClick={() => browserHistory.push('/print-preview')}>Zur Druckansicht</Button>
                </span>
            </p>
        );
    }
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Connection to store /////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const mapStateToProps = (state) => {
    return {

    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        undo: () => {
            dispatch(ActionCreators.undo())
        },
        redo: () => {
            dispatch(ActionCreators.redo())
        }
    }
};

const Foot = connect(
    mapStateToProps,
    mapDispatchToProps
)(FootView);

export default Foot;


