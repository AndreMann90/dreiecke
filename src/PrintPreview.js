import React, {Component} from 'react';
import { connect } from 'react-redux'
import { printPreviewSelector } from './redux/positionList'
import { nameSelector } from './redux/name'

import ShapeListView from './shape_list/ShapeListView'
import {PageHeader} from 'react-bootstrap'

class PrintPreviewView extends Component {

    shouldComponentUpdate(nextProps) {
        return this.props.positionsWithAreas !== nextProps.positionsWithAreas
            || this.props.name !== nextProps.name;
    }

    render() {
        return (
            <div>
                <PageHeader>{this.props.name}</PageHeader>
                {this.props.positionsWithAreas.map((element, index) =>
                    (<Position key={element.positionKey} name={`${index+1}: ` + element.positionName} items={element.selectedItems} overallArea={element.overallArea}/>)
                )}
            </div>
        )
    }
}

function Position(props) {
    return (
        <div style={{marginBottom: 55}}>
            <h3>{props.name}</h3>
            <ShapeListView items={props.items} overallArea={props.overallArea}/>
        </div>
    )
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Connection to store /////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const mapStateToProps = (state) => {
    return {
        name: nameSelector(state),
        positionsWithAreas: printPreviewSelector(state)
    }
};

const PrintPreview = connect(
    mapStateToProps
)(PrintPreviewView);

export default PrintPreview;
