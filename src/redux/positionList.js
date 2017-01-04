import Immutable from 'immutable'


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
    posToAreasMap: Immutable.OrderedMap()
});

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

        case POSITION_NAME_CHANGED:
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

         // Handle actions DELETE_ITEM and DELETE_ALL_ITEMS here as well? Pro: remove unnecessary item ids

        default:
            return state
    }
}