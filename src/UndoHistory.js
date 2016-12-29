
export default class UndoHistory {

    undoList = [];
    redoList = [];

    pushState(state) {
        this.undoList.push(state);
        this.redoList = [];
    }

    undo(currentState) {
        const u = this.undoList.pop();
        if(u == null) {
            return currentState;
        } else {
            this.redoList.unshift(currentState);
            return u;
        }
    }

    redo(currentState) {
        const r = this.redoList.shift();
        if(r == null) {
            return currentState;
        } else {
            this.undoList.push(currentState);
            return r;
        }
    }
}