import { Link } from "react-router";

export default class Breadcrumbs extends React.Component{
    constructor(){
        super();

        this.state = {
            breadcrumbs: []
        };
    }
    componentWillMount(){
        var self = this;
        mediator.publish(channels.BREADCRUMBS_GET_LIST, {
            breadcrumb: this.props.breadcrumb,
            params: this.props.params
        }, function(result){
            self.setState({
                breadcrumbs: result
            });
        });
    }
    render(){
        return (
            <nav className="panel row">
                <div className="nav-wrapper container">
                    <div className="col s12">
                        {
                            this.state.breadcrumbs.map((el) => {
                                return <Link key={el.id} to={el.href} className="breadcrumb">{el.name}</Link>
                            })
                        }
                    </div>
                </div>
            </nav>
        )
    }
}