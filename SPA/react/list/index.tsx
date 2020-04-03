let MobxReact = require('mobx-react');
let React = require('react');
let mobx = require('mobx');
let mobxReact = require('mobx-react');
const moment = require('moment');
const lo = require('lodash');
// import validate from './validate'
let { observer, inject } = mobxReact;

@observer
export default class App extends React.Component {
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
        console.log(store.posts);
        let postsDom = store.posts.map((k, i) => {
            return <li key = {i}>{k.title}</li>
        });
        
        return <ul>{postsDom}</ul>;
    }
};