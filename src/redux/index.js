import { combineReducers } from 'redux'
import { combineEpics } from 'redux-observable';
import undoable, { includeAction } from 'redux-undo';

import name, {NAME_CHANGED, nameChangedEpic} from './name'
import {items, areaNo, ADD_ITEM, DELETE_ITEM, DELETE_ALL_ITEMS} from './itemList'
import {ADD_POSITION, DELETE_POSITION, AREA_ADDED, AREA_REMOVED, POSITION_NAME_CHANGED, positionNameChangedEpic} from './positionList'
import { undo } from './undo'
import positions from './positionList'
import baustellen from './baustellen'
import id from './id'


export const rootEpic = combineEpics(
    nameChangedEpic,
    positionNameChangedEpic
);


const currentBaustelleReducer = undoable(
    combineReducers({
        positions,
        items,
        areaNo,
        name
    }),
    {
        filter: includeAction([ADD_ITEM, DELETE_ITEM, DELETE_ALL_ITEMS, undo(NAME_CHANGED),
            ADD_POSITION, DELETE_POSITION, undo(POSITION_NAME_CHANGED), AREA_ADDED, AREA_REMOVED])
    }
);

const rootReducer = combineReducers({
    current: currentBaustelleReducer,
    baustellen,
    id
});


export default rootReducer

