import React, { Component } from 'react';
import { connect } from 'react-redux'
import { hideAlert, alertShownSelector, alertTextSelector, alertTitleSelector } from './redux/alert'

import { Alert } from 'react-bootstrap';

class AlertView extends Component {

    render() {
        if(this.props.showAlert) {
            return (
                <Alert bsStyle="danger" onDismiss={this.props.hideAlert}>
                    {this.props.alertTitle ? <h4>{this.props.alertTitle}</h4> : null}
                    {this.props.alertText ? <p>{this.props.alertText}</p> : null}
                </Alert>
            );
        } else {
            return null;
        }
    }
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Connection to store /////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const mapStateToProps = (state) => {
    return {
        showAlert: alertShownSelector(state),
        alertTitle: alertTitleSelector(state),
        alertText: alertTextSelector(state)
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        hideAlert: () => {
            dispatch(hideAlert())
        }
    }
};

const AlertComponent = connect(
    mapStateToProps,
    mapDispatchToProps
)(AlertView);

export default AlertComponent;