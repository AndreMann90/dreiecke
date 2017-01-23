import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/dom/ajax';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/mergeMap';

import { url } from './network'
import { showAlert } from './alert'

// actions
export const ADD_BAUSTELLE = 'ADD_BAUSTELLE';
export const addBaustelle = name => ({ type: ADD_BAUSTELLE, payload: name });

export const ADD_BAUSTELLE_SUCCESS = 'ADD_BAUSTELLE_SUCCESS';
const addBaustelleSuccess = newBaustelle => ({ type: ADD_BAUSTELLE_SUCCESS, payload: newBaustelle });


// reducer
export default function baustellen(state = [], action) {
    switch (action.type) {
        case ADD_BAUSTELLE_SUCCESS:
            return [ action.payload, ...state ];

        default:
            return state
    }
}

// selectors
export const baustellenSelector = state => state.baustellen;

// epics
export const newBaustelleEpic = (action$, store) =>
    action$.ofType(ADD_BAUSTELLE)
        .mergeMap( data =>
            Observable.ajax({
                    method: 'POST',
                    headers: {'Content-Type': "application/json; charset=UTF-8"},
                    url: url,
                    body: {name: data.payload}
                })
                .map(success => addBaustelleSuccess({
                    id: success.response.id,
                    name: success.response.name,
                    lastmodified: success.response.lastmodified
                }))
                .catch(error => Observable.of(
                    showAlert('Ups, da ist etwas schief gelaufen', 'Probiere es nochmal. Falls es dann immer noch nicht' +
                        ' geklappt hat, frage beim Administrator nach')
                ))
        );