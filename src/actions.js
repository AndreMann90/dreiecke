
export const ADD_ITEM = 'ADD_ITEM';
export const addItem = item => ({ type: ADD_ITEM, payload: item });

export const DELETE_ITEM = 'DELETE_ITEM';
export const deleteItem = item => ({ type: DELETE_ITEM, payload: item });

export const DELETE_ALL_ITEMS = 'DELETE_ALL_ITEMS';
export const deleteAllItems = () => ({ type: DELETE_ALL_ITEMS});


export const AREA_NO_CHANGED = 'AREA_NO_CHANGED';
export const areaNoChanged = (areaNo) => ({ type: AREA_NO_CHANGED, payload: areaNo});


export const NAME_CHANGED = 'NAME_CHANGED';
export const nameChanged = (name) => ({ type: NAME_CHANGED, payload: name});