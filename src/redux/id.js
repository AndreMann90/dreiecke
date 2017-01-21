
// actions
export const SET_ID = 'SET_ID';
export const setId = id => ({ type: SET_ID, payload: id });


// reducer
export default function id(state = '', action) {
    switch (action.type) {
        case SET_ID:
            return action.payload;

        default:
            return state
    }
}

// selectors
export const idSelector = state => state.id;
export const printPreviewLinkSelector = state => `${state.id}/print-preview`; // if more like this appears -> put in a new routes module

