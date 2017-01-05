import { connect } from 'react-redux'

import {areaRemoved, selectedItemsForActivePositionSelector, overallAreaOfSelectedItemsForActivePositionSelector} from '../redux/positionList'

import ShapeListView from './ShapeListView'

const mapStateToProps = state => {
    return {
        items: selectedItemsForActivePositionSelector(state),
        overallArea: overallAreaOfSelectedItemsForActivePositionSelector(state),
        itemSelectedFcn: (item) => {return true},
        selectable: true
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onSelect: (item) => {
            dispatch(areaRemoved(item.id))
        }
    }
};

const ShapeListAdded = connect(
    mapStateToProps,
    mapDispatchToProps
)(ShapeListView);

export default ShapeListAdded