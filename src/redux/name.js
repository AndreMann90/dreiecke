// actions
export const NAME_CHANGED = 'NAME_CHANGED';
export const nameChanged = (name) => ({ type: NAME_CHANGED, payload: name});

export const NAME_CHANGED_ADD_TO_UNDO = 'NAME_CHANGED_ADD_TO_UNDO';
export const nameChangedAddToUndo = (name) => ({ type: NAME_CHANGED_ADD_TO_UNDO, payload: name});

// reducer
export default function name(state =  '', action) {
    switch (action.type) {

        case NAME_CHANGED:
            return action.payload;

        default:
            return state
    }
}
