import { combineReducers } from 'redux'
import undoable, { includeAction } from 'redux-undo';

import name from './name'
import {items, areaNo, ADD_ITEM, DELETE_ITEM, DELETE_ALL_ITEMS} from './itemList'


const rootReducer = undoable(
    combineReducers({
        items,
        areaNo,
        name
    }),
    {
        filter: includeAction([ADD_ITEM, DELETE_ITEM, DELETE_ALL_ITEMS])
    }
);


export default rootReducer

