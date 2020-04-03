let React = require('react');
let mobx = require('mobx');
let mobxReact = require('mobx-react');
const moment = require('moment');
const lo = require('lodash');
// import validate from './validate'
let { observer, inject } = mobxReact;

//import 'toastr/build/toastr.css';
@inject("store")
@observer
export default class App extends React.Component {
    constructor(prop) {
        super(prop);
    }
    componentDidMount() {

    }
    render() {

        return <>
            APP
        </>;
    }
};