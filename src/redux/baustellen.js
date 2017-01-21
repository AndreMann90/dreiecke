import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/dom/ajax';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/switchMap';

import { url } from './network'

// actions
export const ADD_BAUSTELLE = 'ADD_BAUSTELLE';
export const addBaustelle = name => ({ type: ADD_BAUSTELLE, payload: name });

export const ADD_BAUSTELLE_SUCCESS = 'ADD_BAUSTELLE_SUCCESS';
const addBaustelleSuccess = newBaustelle => ({ type: ADD_BAUSTELLE_SUCCESS, payload: newBaustelle });

export const ADD_BAUSTELLE_FAILED = 'ADD_BAUSTELLE_FAILED';
const addBaustelleFailed = (error) => ({ type: ADD_BAUSTELLE_FAILED, error });


// reducer
export default function baustellen(state = [], action) {
    switch (action.type) {
        case ADD_BAUSTELLE_SUCCESS:
            return [ ...state, action.payload ];

        default:
            return state
    }
}

// selectors
export const baustellenSelector = state => state.baustellen;

// epics
export const newBaustelleEpic = (action$, store) =>
    action$.ofType(ADD_BAUSTELLE)
        .switchMap( data =>
            Observable.ajax({
                    method: 'POST',
                    headers: {'Content-Type': "application/json; charset=UTF-8"},
                    url: url,
                    body: {name: data.payload}
                })
                .map(success => addBaustelleSuccess({id: success.response.id, name: success.response.name}))
                .catch(error => Observable.of(
                    addBaustelleFailed(error)
                ))
        );