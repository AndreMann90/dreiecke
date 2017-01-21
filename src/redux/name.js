import 'rxjs/add/operator/throttleTime';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/merge';
import {undo, noUndo, throttleUndoEpic} from './undo'

// actions
export const NAME_CHANGED = 'NAME_CHANGED';
export const nameChanged = (name) => ({ type: NAME_CHANGED, payload: name});

// reducer
export default function name(state =  '', action) {
    switch (action.type) {

        case undo(NAME_CHANGED):
        case noUndo(NAME_CHANGED):
            return action.payload;

        default:
            return state
    }
}

// selectors
export const nameSelector = state => state.current.present.name;

// epics
export const nameChangedEpic = throttleUndoEpic(NAME_CHANGED);