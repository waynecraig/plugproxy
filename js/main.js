require('es6-promise').polyfill();
require('isomorphic-fetch');

import {
    default as React,
    Component,
    PropTypes
} from 'react';
import { render } from 'react-dom';
import MainView from '../views/mainView';
import { getData } from './actions';

const wrap = document.createElement('div');
wrap.setAttribute('class', 'wrap');
document.body.appendChild(wrap);

class Main extends Component {

    constructor() {
        super();
        this.state = {
            data: null
        };
    }

    loadData() {
        getData().then((data) => {
            this.setState({data: data});
        }).catch((e) => {
            alert(e);
        });
    }

    componentDidMount() {
        this.loadData();
    }

    render() {
        return (
            <div>
                { this.state.data ? 
                    <MainView data={this.state.data} refresh={()=>this.loadData()}/> : 
                    <div>loading</div> }
            </div>
        );
    }

}

render(<Main/>, wrap);
