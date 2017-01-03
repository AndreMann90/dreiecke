import { ajax } from 'rxjs/observable/ajax';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/bufferWithTime';

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Status: DRAFT for 2 option  /////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const url = 'http://example.org';

// actions
const SYNC_FAILED = 'SYNC_FAILED';
const syncFailed = payload => ({ type: SYNC_FAILED, payload, error: true });

// epics

// option 1: rather dump (very wasteful) but a generic server can be written that does not need to know anything about the redux app
export const syncStateWithServerEpic = (action$, store) =>
    action$.filter(action => action.type !== SYNC_FAILED) // optionally add more that shall not be synchronized
        .debounceTime(5000)
        .map({
            id: "", // add meta data for server (like userID and appID)
            state: store.getState() // see discussion above
        })
        .switchMap( data =>
            ajax.put(url, JSON.stringify(data))
                .catch(error => Observable.of(
                    syncFailed(error.response)
                ))
        );

// option 2: Synchronize actions only. Drawback: server needs to know all the actions that can be performed
// Remarks on possible server implementation:
//  - potentially reuse reducers if using node js server - in order to do so: idea is to pick users store for ID and then apply reducers to this particular user store. However, reading the particular user store from DB and writing it back may be expensive
//  - potentially use actor-based server, since actions translate nicely into messages
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
                // .retry(3) TODO need to prevent order of actions being send
                .catch(error => Observable.of(
                    syncFailed(error.response)
                ))
        );