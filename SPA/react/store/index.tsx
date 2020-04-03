let mobx = require('mobx');
const sa = require('superagent');
let { observable, toJS } = mobx;
import urlRouter from '@fendy3002/url-router';
import listStore from './list';

class Store {
    constructor(context) {
        this.context = context;
        this.urlRouter = urlRouter({
            routes: [
                {
                    label: 'list',
                    path: '/',
                    data: null,
                    callback: this.onPathChange
                },
                {
                    label: 'create',
                    path: '/:id/create',
                    data: null,
                    callback: this.onPathChange
                },
                {
                    label: 'view',
                    path: '/:id/view',
                    data: null,
                    callback: this.onPathChange
                },
                {
                    label: 'edit',
                    path: '/:id/edit',
                    data: null,
                    callback: this.onPathChange
                },
                {
                    label: 'delete',
                    path: '/:id/delete',
                    data: null,
                    callback: this.onPathChange
                },
            ]
        });
        this.urlRouter.refresh();
    }

    context = null;
    urlRouter = null;
    @observable
    currentStore = null;
    storeMap = {
        "delete": (pathData) => null,
        "edit": (pathData) => null,
        "create": (pathData) => null,
        "list": (pathData) => new listStore(this, pathData),
        "view": (pathData) => null
    };

    lastRoute = null;
    onPathChange(data) {
        if (this.lastRoute && this.lastRoute.label == data.label) {
            if (this.currentStore && this.currentStore.onPathChange) {
                this.currentStore.onPathChange(data);
            }
        }
        else {
            this.currentStore = this.storeMap[data.label](data);
        }
        this.lastRoute = data;
    }
};
export default Store;