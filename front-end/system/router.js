import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import Layout from '../app/Layout';

var routes  = _.filter(system.routes, function (i) {
    var valid = true;
    if (i.rule) {
        if (system.rules) {
            var rule = _.find(system.rules, function(r){
                return r.alias === i.rule;
            });
            if(!rule || !rule.value){
                valid = false;
            }
        } else {
            valid = false;
        }
    }
    return valid;
});

ReactDOM.render(
    <Router history={hashHistory}>
        <Route path='/' component={Layout}>
            {
                routes.map((route, index) => {

                    return (
                        route.path === 'index' ?
                            <IndexRoute
                                key={index}
                                component={route.component}
                                breadcrumb={route.path}/>
                            :
                            <Route key={index}
                                   path={route.path}
                                   component={route.component}
                                   breadcrumb={route.path} />
                    )
                })
            }
        </Route>
    </Router>,
    document.getElementById('app')
);