import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import './libs/libs';
import './app.scss';

import Layout from './components/Layout';
import Telephony from './components/Telephony/Telephony';

window.constants = require('./constants/constants');

window.channels = require('./mediator/channels');
window.mediator = require('./mediator/mediator');

if(channels && mediator){
    _.forEach(channels, function(properties) {
        mediator.subscribe(properties, function(data, callback){
            if(properties.method && typeof(properties.method) === 'function'){
                properties.method(data, callback && typeof(callback) === 'function' ? callback : function(){});
            }
        });
    });
}

const app = document.getElementById('app');
ReactDOM.render(
    <Router history={hashHistory}>
        <Route path='/' component={Layout}>
            <IndexRoute component={Telephony} breadcrumb='telephony' />
        </Route>
    </Router>,
    app);