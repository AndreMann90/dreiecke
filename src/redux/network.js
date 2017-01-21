import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/dom/ajax';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/debounceTime';

import { ADD_BAUSTELLE, ADD_BAUSTELLE_SUCCESS } from './baustellen'
import { SHOW_ALERT, HIDE_ALERT, showAlert } from './alert'
import { SET_ID, idSelector } from './id'
import { nameSelector } from './name'

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// network.js is responsible for synchronizing the state with the server  //////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const url = 'http://localhost:9000/';

// actions
export const SYNCHRONIZED = 'SYNCHRONIZED';
const synchronized = {type: SYNCHRONIZED};

const currentBaustelleExtractor = state => ({current: {present: state.current.present}});

// epics

// option 1: rather dump (very wasteful) but a generic server can be written that does not need to know anything about the redux app
export const syncStateWithServerEpic = (action$, store) =>
    action$.filter(action => store && store.getState()
                    && ![SYNCHRONIZED, SET_ID, SHOW_ALERT, HIDE_ALERT,
                        ADD_BAUSTELLE, ADD_BAUSTELLE_SUCCESS].includes(action.type)) // optionally add more that shall not be synchronized
        .debounceTime(2000)
        .map(x => ({
            id: idSelector(store.getState()),
            name: nameSelector(store.getState()),
            state: currentBaustelleExtractor(store.getState())
        }))
        .switchMap( data =>
            Observable.ajax({
                    method: 'PUT',
                    headers: {'Content-Type': "application/json; charset=UTF-8"},
                    url: url + data.id,
                    body: data
                })
                .map(success => synchronized)
                .catch(error => Observable.of(
                    showAlert('Synchronisation fehltgeschlagen', 'Der aktuelle Stand konnte nicht gespeichert werden. ' +
                        'Drucke deine Arbeit unbedingt aus, da diese sonst verloren geht!')
                ))
        );

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// DRAFT for 2. option  ////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// option 2: Synchronize actions only. Drawback: server needs to know all the actions that can be performed
// Remarks on possible server implementation:
//  - potentially reuse reducers if using node js server - in order to do so: idea is to pick users store for ID and then apply reducers to this particular user store. However, reading the particular user store from DB and writing it back may be expensive
//  - potentially use actor-based server, since actions translate nicely into messages
/*
export const syncActionsWithServerEpic = action$ =>
    action$.filter(action => action.type !== SYNC_FAILED) // optionally add more that shall not be synchronized
        .bufferWithTime(5000)
        .map(actions => {
            return {
                id: "", // add meta data for server (like userID and appID)
                actionList: actions
            }
        })
        .mergeMap( data =>
            ajax.put(url, JSON.stringify(data))
                // .retry(3) TO DO need to prevent order of actions being send
                .catch(error => Observable.of(
                    syncFailed(error.response)
                ))
        );
*/