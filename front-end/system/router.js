import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import Layout from '../app/Layout';

ReactDOM.render(
    <Router history={hashHistory}>
        <Route path='/' component={Layout}>
            {
                system.routes.map((route) => {
                    return (
                        route.path === 'index' ?
                            <IndexRoute component={route.component} />
                            :
                            <Route path={route.path} component={route.component} breadcrumb={route.path} />
                    )
                })
            }
        </Route>
    </Router>,
    document.getElementById('app')
);