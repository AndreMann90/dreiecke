import { connect } from 'react-redux'

import {areaAdded, notSelectedItemsForActivePositionSelector, overallAreaOfNonSelectedItemsForActivePositionSelector} from '../redux/positionList'


import ShapeListView from './ShapeListView'

const mapStateToProps = state => {
    return {
        items: notSelectedItemsForActivePositionSelector(state),
        overallArea: overallAreaOfNonSelectedItemsForActivePositionSelector(state),
        itemSelectedFcn: (item) => {return false},
        selectable: true
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onSelect: (item) => {
            dispatch(areaAdded(item.id))
        }
    }
};

const ShapeListRemaining = connect(
    mapStateToProps,
    mapDispatchToProps
)(ShapeListView);

export default ShapeListRemaining