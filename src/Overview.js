import React, { Component } from 'react';
import { connect } from 'react-redux'
import { baustellenSelector } from './redux/baustellen'

import { PageHeader, ListGroup, ListGroupItem } from 'react-bootstrap';

class OverviewView extends Component {

    render() {
        return (
            <div>
                <PageHeader>Baustellen App</PageHeader>

                <ListGroup>
                    {this.props.baustellen.map(item => (
                        <ListGroupItem href={item.id}>{item.name}</ListGroupItem>
                    ))}
                </ListGroup>
            </div>
        );
    }
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Connection to store /////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const mapStateToProps = (state) => {
    return {
        baustellen: baustellenSelector(state)
    }
};

const mapDispatchToProps = (dispatch) => {
    return {

    }
};

const Overview = connect(
    mapStateToProps,
    mapDispatchToProps
)(OverviewView);

export default Overview;


