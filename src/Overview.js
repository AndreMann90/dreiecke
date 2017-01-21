import React, { Component } from 'react';
import { connect } from 'react-redux'
import { addBaustelle, baustellenSelector } from './redux/baustellen'

import { PageHeader, ListGroup, ListGroupItem, Grid, Row, Col, Button } from 'react-bootstrap';

class OverviewView extends Component {

    render() {
        return (
        <Grid>
            <Row>
                <Col>
                    <PageHeader>Baustellen App</PageHeader>

                    <ListGroup>
                        {this.props.baustellen.map(item => (
                            <ListGroupItem key={item.id} href={item.id}>{item.name}</ListGroupItem>
                        ))}
                    </ListGroup>

                    <Button bsStyle="success" onClick={() => {this.props.newBaustelle()}}>Neue Baustelle</Button>
                </Col>
            </Row>
        </Grid>
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
        newBaustelle: () => {
            dispatch(addBaustelle(''))
        }
    }
};

const Overview = connect(
    mapStateToProps,
    mapDispatchToProps
)(OverviewView);

export default Overview;


