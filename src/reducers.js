import { ADD_ITEM, DELETE_ITEM, DELETE_ALL_ITEMS, AREA_NO_CHANGED, NAME_CHANGED } from './actions'

import { combineReducers } from 'redux'
import undoable from 'redux-undo';

import Immutable from 'immutable';


function items(state =  Immutable.List(), action) {
    switch (action.type) {

        case ADD_ITEM:
            const newItem = action.payload;
            const key = state.findLastKey(item => {
                return (item.areaNumber <= newItem.areaNumber)
            });

            if(key == null || (key + 1) === state.size) { // empty list or push new item (which is last item)
                return state.push(newItem);
            } else { // insert item into the by area number ordered list
                return state.insert((key + 1), newItem);
            }

        case DELETE_ITEM:
            const index = this.state.items.indexOf(action.payload);
            return state.delete(index);

        case DELETE_ALL_ITEMS:
            return state.clear();

        default:
            return state
    }
}

function areaNo(state =  1, action) {
    switch (action.type) {

        case AREA_NO_CHANGED:
            return action.payload;

        case ADD_ITEM:
            return parseFloat(state) + 1;

        case DELETE_ALL_ITEMS:
            return 1;

        default:
            return state
    }
}

function name(state =  '', action) {
    switch (action.type) {

        case NAME_CHANGED:
            return action.payload;

        default:
            return state
    }
}


const measurementApp = combineReducers({
    items: undoable(items),
    areaNo: undoable(areaNo),
    name
});

export default measurementApp