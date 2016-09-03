import './app.scss';

import Navbar from './components/Navbar/Navbar';
import Breadcrumbs from './components/Breadcrumbs/Breadcrumbs';

export default class Layout extends React.Component{
    render() {
        return (
            <div>
                <Navbar />
                <Breadcrumbs breadcrumb={this.props.routes[1].breadcrumb} params={this.props.params} />
                <div className="container">
                    {this.props.children}
                </div>
            </div>
        );
    }
}