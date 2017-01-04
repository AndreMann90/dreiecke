
// util
export const convertType = type => action => ({type: type, payload: action.payload});

// actions
export const undo = type => ("U_" + type);
export const noUndo = type => ("NU_" + type);

// epics

// epic explained: the purpose is to throttle time in order to not add every action to undo list (eg. typing a name)
// an action type gets two "sub-actions", (1) one for undo this and (2) one for don't undo this.
// redux-observable lets the original action arrive first the reducers, thus, the original action can't be used as (2).
// Though, in most cases this behaviour of redux-observable is what is desirable, in this case it is not.
// The result is that this gets verbose in this case. (Still like redux-observable)
export const throttleUndoEpic = type => action$ =>
    action$.ofType(type)
        .throttleTime(2000)
        .map(convertType(undo(type)))
        .merge(
            action$.ofType(type)
                .map(convertType(noUndo(type)))
        );