import Navbar from './Navbar/Navbar';
import Breadcrumbs from './Breadcrumbs/Breadcrumbs';

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