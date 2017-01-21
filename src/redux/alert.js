import 'rxjs/add/operator/map';

import { ADD_BAUSTELLE_SUCCESS } from './baustellen'
import { SYNCHRONIZED } from './network'

// actions
export const SHOW_ALERT = 'SHOW_ALERT';
export const showAlert = (title, text) => ({ type: SHOW_ALERT, payload: {title, text} });

export const HIDE_ALERT = 'HIDE_ALERT';
export const hideAlert = () => ({ type: HIDE_ALERT });


// reducer
export default function alert(state = '', action) {
    switch (action.type) {

        case SHOW_ALERT:
            return action.payload;

        case HIDE_ALERT:
            return '';

        default:
            return state
    }
}

// selectors
export const alertShownSelector = state => !!state.alert;
export const alertTitleSelector = state => state.alert.title;
export const alertTextSelector = state => state.alert.text;


// epics
export const hideAlertEpic = (action$, store) =>
    action$.ofType(ADD_BAUSTELLE_SUCCESS, SYNCHRONIZED)
        .map(() => hideAlert());