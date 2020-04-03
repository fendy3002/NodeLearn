let mobx = require('mobx');
const sa = require('superagent');
let { observable, toJS } = mobx;

class ListStore {
    constructor(mainStore, pathData) {
        this.mainStore = mainStore;
    }
    apiPath = {

    };
    mainStore;
    onPathChange(pathData) {

    }
};
export default ListStore;