import 'rxjs/add/operator/throttleTime';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/merge';

// actions
export const NAME_CHANGED = 'NAME_CHANGED';
export const nameChanged = (name) => ({ type: NAME_CHANGED, payload: name});

// actions for internal use in epic (below)
export const NAME_CHANGED_WITH_UNDO = 'NAME_CHANGED_WITH_UNDO'; // export for including in undo
const NAME_CHANGED_NO_UNDO = 'NAME_CHANGED_NO_UNDO';
const convertType = type => action => {return {type: type, payload: action.payload}};

// reducer
export default function name(state =  '', action) {
    switch (action.type) {

        case NAME_CHANGED_NO_UNDO:
        case NAME_CHANGED_WITH_UNDO:
            return action.payload;

        default:
            return state
    }
}

// epics
export const nameChangedEpic = action$ =>
    action$.ofType(NAME_CHANGED)
        .throttleTime(2000) // only add a name change to undo every 2 seconds
        .map(convertType(NAME_CHANGED_WITH_UNDO))
        .merge( // need to merge in NAME_CHANGED_NO_UNDO because NAME_CHANGED is dispatched before NAME_CHANGED_WITH_UNDO and thus can not be used
            action$.ofType(NAME_CHANGED)
                .map(convertType(NAME_CHANGED_NO_UNDO))
        );