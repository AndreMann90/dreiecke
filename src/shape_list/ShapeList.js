import { connect } from 'react-redux'
import { deleteItem, deleteAllItems, itemsSelector, overallAreaSelector } from '../redux/itemList'

import ShapeListView from './ShapeListView'

const mapStateToProps = (state, ownProps) => {
    return {
        items: itemsSelector(state),
        overallArea: overallAreaSelector(state),
        deletable: ownProps.deletable
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onDelete: (item) => {
            dispatch(deleteItem(item))
        },
        onDeleteAll: () => {
            dispatch(deleteAllItems())
        }
    }
};

const ShapeList = connect(
    mapStateToProps,
    mapDispatchToProps
)(ShapeListView);

export default ShapeList