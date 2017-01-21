import Immutable from 'immutable'

// actions
export const ADD_BAUSTELLE = 'ADD_BAUSTELLE';
export const addBaustelle = name => ({ type: ADD_BAUSTELLE, payload: name });

export const DELETE_BAUSTELLE = 'DELETE_BAUSTELLE';
export const deleteBaustelle = id => ({ type: DELETE_BAUSTELLE, payload: id });


// reducer
export default function baustellen(state = Immutable.List(), action) {
    switch (action.type) {
        case ADD_BAUSTELLE:
            //TODO

        case DELETE_BAUSTELLE:
            //TODO

        default:
            return state
    }
}

// selectors
export const baustellenSelector = state => state.baustellen;

