import { createStore, applyMiddleware  } from 'redux'
import createLogger from 'redux-logger';
import { createEpicMiddleware } from 'redux-observable';
import { rootEpic } from './index';
import rootReducer from './index'
import {addPosition} from './positionList'


const configureStore = (initState) => {
    //configuring middleware
    let withStateDiff = false;
    let logger = createLogger({diff: withStateDiff});

    const epicMiddleware = createEpicMiddleware(rootEpic);

    //setup store
    let store = createStore(
        rootReducer,
        initState,
        applyMiddleware(epicMiddleware, logger)
    );

    if(!initState) {
        store.dispatch(addPosition())
    }

    return store;
};

export default configureStore