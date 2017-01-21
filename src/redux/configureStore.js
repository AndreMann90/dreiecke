import { createStore, applyMiddleware  } from 'redux'
import createLogger from 'redux-logger';
import { createEpicMiddleware } from 'redux-observable';
import { rootEpic } from './index';
import rootReducer from './index'
import { initializePositionListWith } from './positionList'
import { initializeItemListWith } from './itemList'


const configureStore = (initState) => {
    //configuring middleware
    let withStateDiff = false;
    let logger = createLogger({diff: withStateDiff});

    const epicMiddleware = createEpicMiddleware(rootEpic);

    //setup store
    initImmutable(initState);
    let store = createStore(
        rootReducer,
        initState,
        applyMiddleware(epicMiddleware, logger)
    );

    return store;
};

// not that nice, but necessary if using Immutable.js since structural information in json lost need to be recovered
export function initImmutable(initState) {
    if(initState && initState.current && initState.current.present) {
        initState.current.present.positions = initializePositionListWith(initState.current.present.positions);
        initState.current.present.items = initializeItemListWith(initState.current.present.items);
    }
}

export default configureStore