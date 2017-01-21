import Immutable from 'immutable'
import { createSelector } from 'reselect'

import {DELETE_ITEM, DELETE_ALL_ITEMS, itemsSelector, reduceItemsToOverallArea} from './itemList'
import {undo, noUndo, throttleUndoEpic} from './undo'

// actions
export const ADD_POSITION = 'ADD_POSITION';
export const addPosition = () => ({ type: ADD_POSITION });

export const DELETE_POSITION = 'DELETE_POSITION';
export const deletePosition = position => ({ type: DELETE_POSITION, payload: position });

export const POSITION_NAME_CHANGED = 'POSITION_NAME_CHANGED';
export const positionNameChanged = (position, name) => ({ type: POSITION_NAME_CHANGED,
                                                          payload: {position: position, name: name} });

export const ACTIVE_KEY = 'ACTIVE_KEY';
export const activeKey = key => ({ type: ACTIVE_KEY, payload: key });

export const AREA_ADDED = 'AREA_ADDED';
export const areaAdded = areaId => ({ type: AREA_ADDED, payload: areaId });

export const AREA_REMOVED = 'AREA_REMOVED';
export const areaRemoved = areaId => ({ type: AREA_REMOVED, payload: areaId });


// reducer
const initialState = Immutable.Map({
    activeKey: 0,
    positions: Immutable.OrderedMap(),
    posToAreasMap: Immutable.Map()
});

export function initializePositionListWith(preloaded) {
    if(preloaded) {
        const pos = [];
        const posMap = [];
        for (const key in preloaded.positions) {
            if(preloaded.positions.hasOwnProperty(key)) {
                pos.push([parseFloat(key), preloaded.positions[key]]);
                posMap.push([parseFloat(key), Immutable.Set(preloaded.posToAreasMap[key])]);
            }
        }
        return Immutable.Map({
            activeKey: preloaded.activeKey,
            positions: Immutable.OrderedMap(pos),
            posToAreasMap: Immutable.Map(posMap)
        });
    } else {
        return initialState;
    }
}

export default function positions(state = initialState, action) {
    switch (action.type) {

        case ADD_POSITION:
            const lastKey = state.get('positions').findLastKey(() => true);
            const nextKey = (lastKey == null) ? 1 : (lastKey + 1);
            return state.setIn(['positions', nextKey], '')
                .setIn(['posToAreasMap', nextKey], Immutable.Set())
                .setIn(['activeKey'], nextKey);

        case DELETE_POSITION:
            const newState = state.deleteIn(['positions', action.payload])
                .deleteIn(['posToAreasMap', action.payload]);
            if(action.payload === state.get('activeKey')) {
                const prevKey = state.get('positions').findLastKey((v, key) => key < action.payload);
                if(prevKey != null) {
                    return newState.set('activeKey', prevKey);
                }
            }
            return newState;

        case undo(POSITION_NAME_CHANGED):
        case noUndo(POSITION_NAME_CHANGED):
            return state.setIn(['positions', action.payload.position], action.payload.name);

        case ACTIVE_KEY:
            if(state.get('positions').has(action.payload)) {
                return state.setIn(['activeKey'], action.payload);
            } else {
                return state;
            }

        case AREA_ADDED:
            return state.updateIn(['posToAreasMap', state.get('activeKey')], areas => areas.add(action.payload));

        case AREA_REMOVED:
            return state.updateIn(['posToAreasMap', state.get('activeKey')], areas => areas.delete(action.payload));

        case DELETE_ITEM:
            return state.update('posToAreasMap', posToAreasMap => posToAreasMap.map(areas => areas.delete(action.payload.id)));

        case DELETE_ALL_ITEMS:
            return state.update('posToAreasMap', posToAreasMap => posToAreasMap.map(areas => areas.clear()));

        default:
            return state
    }
}

// selectors
export const activeKeySelector = state => state.current.present.positions.get('activeKey');
export const positionsSelector = state => state.current.present.positions.get('positions');
const posToAreasMapSelector = state => state.current.present.positions.get('posToAreasMap');

const selectedItemIdsOfActivePositionSelector = state => state.current.present.positions.getIn(['posToAreasMap', activeKeySelector(state)]);
// partitions the items into two lists: selected and not selected items for active position
const selectedItemsPartition = createSelector(
    itemsSelector, selectedItemIdsOfActivePositionSelector,
    (items, selectedItemsIds) => items.reduce(
            (partition, item) => {selectedItemsIds.has(item.id) ? partition.selected.push(item) : partition.notSelected.push(item); return partition},
            {selected: [], notSelected: []}
        )
);
export const selectedItemsForActivePositionSelector = state => selectedItemsPartition(state).selected;
export const notSelectedItemsForActivePositionSelector = state => selectedItemsPartition(state).notSelected;

export const overallAreaOfSelectedItemsForActivePositionSelector = createSelector(
    selectedItemsForActivePositionSelector,
    items => reduceItemsToOverallArea(items)
);
export const overallAreaOfNonSelectedItemsForActivePositionSelector = createSelector(
    notSelectedItemsForActivePositionSelector,
    items => reduceItemsToOverallArea(items)
);

// specialized selector designed for an isolated print preview (not performance optimized for use with other views which manipulate the same data)
export const printPreviewSelector = createSelector(
    positionsSelector, itemsSelector, posToAreasMapSelector,
    (positions, items, posToAreasMap) => positions.reduce( // use reduce instead of map, because want the positions "become"/"reduce to" a list
        (result, positionName, positionKey) => {
            const selectedItemIds = posToAreasMap.get(positionKey);
            const selectedItems = items.filter(item => selectedItemIds.has(item.id));
            const overallArea = reduceItemsToOverallArea(selectedItems);
            result.push({positionName, positionKey, selectedItems, overallArea});
            return result
        }, []
    )
);

// epics
export const positionNameChangedEpic = throttleUndoEpic(POSITION_NAME_CHANGED);