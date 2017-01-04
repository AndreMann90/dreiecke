import { connect } from 'react-redux'
import { deleteItem, deleteAllItems } from '../redux/itemList'

import {areaRemoved} from '../redux/positionList'

import {numToStr} from '../util'

import ShapeListView from './ShapeListView'

const mapStateToProps = state => {
    const activeKey = state.present.positions.get('activeKey');
    const itemSet = state.present.positions.getIn(['posToAreasMap', activeKey]);
    const items = state.present.items.filter(item => itemSet.has(item.id));
    return {
        items: items,
        overallArea: numToStr(items.reduce((sum, i) => (sum+parseFloat(i.area)), 0)),
        itemSelectedFcn: (item) => {return true},
        selectable: true
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
            dispatch(areaRemoved(item.id))
        },
        onSelectAll: () => {
            console.log('selectall');
            //TODO
        }
    }
};

const ShapeListAdded = connect(
    mapStateToProps,
    mapDispatchToProps
)(ShapeListView);

export default ShapeListAdded