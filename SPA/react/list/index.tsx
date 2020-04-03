let MobxReact = require('mobx-react');
let React = require('react');
let mobx = require('mobx');
let mobxReact = require('mobx-react');
const moment = require('moment');
const lo = require('lodash');
import ListTable from './ListTable';
// import validate from './validate'
let { observer, inject } = mobxReact;

@observer
export default class List extends React.Component {
    constructor(prop) {
        super(prop);
    }
    componentDidMount() {

    }
    render() {
        let { store } = this.props;
        if(!store.posts || store.posts.length == 0){
            return <></>;
        }
        
        return <ListTable data={store.posts}></ListTable>;
    }
};