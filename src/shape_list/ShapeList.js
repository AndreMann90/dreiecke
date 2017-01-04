import { connect } from 'react-redux'
import { deleteItem, deleteAllItems } from '../redux/itemList'

import {numToStr} from '../util'

import ShapeListView from './ShapeListView'

const mapStateToProps = (state, ownProps) => {
    return {
        items: state.present.items,
        overallArea: numToStr(state.present.items.reduce((sum, i) => (sum+parseFloat(i.area)), 0)),
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
        },
        onSelect: (item) => {
            console.log(item);
            //TODO
        },
        onSelectAll: () => {
            console.log('selectall');
            //TODO
        }
    }
};

const ShapeList = connect(
    mapStateToProps,
    mapDispatchToProps
)(ShapeListView);

export default ShapeList