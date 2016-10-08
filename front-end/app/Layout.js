import './app.scss';

import Navbar from './components/Navbar/Navbar';
import Breadcrumbs from './components/Breadcrumbs/Breadcrumbs';
import Authorization from './components/Authorization/Authorization';

export default class Layout extends React.Component{
    render() {
        var breadcrumb = this.props.routes && this.props.routes[1] ? this.props.routes[1].breadcrumb : null;
        var params = this.props.params;
        return (
            <div>
                <Navbar />
                {
                    system.user ?
                        <Breadcrumbs breadcrumb={breadcrumb} params={params} />
                        :
                        null
                }
                <div className="container">
                    {system.user ? this.props.children : <Authorization />}
                </div>
            </div>
        );
    }
}