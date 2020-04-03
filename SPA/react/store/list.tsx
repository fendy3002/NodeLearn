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
        console.log(pathData);
    }
};
export default ListStore;