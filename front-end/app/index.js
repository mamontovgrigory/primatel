import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import Layout from './components/Layout';
import Telephony from './components/Telephony/Telephony';

import './mediator/mediator';

const app = document.getElementById('app');
ReactDOM.render(
    <Router history={hashHistory}>
        <Route path='/' component={Layout}>
            <IndexRoute component={Telephony} />
        </Route>
    </Router>,
    app);