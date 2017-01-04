import { combineReducers } from 'redux'
import { combineEpics } from 'redux-observable';
import undoable, { includeAction } from 'redux-undo';

import name, {NAME_CHANGED_WITH_UNDO, nameChangedEpic} from './name'
import {items, areaNo, ADD_ITEM, DELETE_ITEM, DELETE_ALL_ITEMS} from './itemList'
import positions from './positionList'


export const rootEpic = combineEpics(
    nameChangedEpic
);


const rootReducer = undoable(
    combineReducers({
        positions,
        items,
        areaNo,
        name
    }),
    {
        filter: includeAction([ADD_ITEM, DELETE_ITEM, DELETE_ALL_ITEMS, NAME_CHANGED_WITH_UNDO])
    }
);


export default rootReducer

