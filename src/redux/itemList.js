import Immutable from 'immutable'


// actions
export const ADD_ITEM = 'ADD_ITEM';
export const addItem = item => ({ type: ADD_ITEM, payload: item });

export const DELETE_ITEM = 'DELETE_ITEM';
export const deleteItem = item => ({ type: DELETE_ITEM, payload: item });

export const DELETE_ALL_ITEMS = 'DELETE_ALL_ITEMS';
export const deleteAllItems = () => ({ type: DELETE_ALL_ITEMS});


export const AREA_NO_CHANGED = 'AREA_NO_CHANGED';
export const areaNoChanged = (areaNo) => ({ type: AREA_NO_CHANGED, payload: areaNo});


// reducer
export function items(state =  Immutable.List(), action) {
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

export function areaNo(state =  1, action) {
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
