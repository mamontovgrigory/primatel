import { Link } from "react-router";

export default class Breadcrumbs extends React.Component{
    constructor(){
        super();

        this.state = {
            breadcrumbs: []
        };
    }
    render(){
        var self = this;
        mediator.publish(channels.BREADCRUMBS_GET_LIST, {
            breadcrumb: self.props.breadcrumb,
            params: self.props.params
        }, function(result){
            self.breadcrumbs = result;
        });
        return (
            <nav className="panel row">
                <div className="nav-wrapper container">
                    <div className="col s12">
                        {
                            self.breadcrumbs.map((el) => {
                                return <Link key={el.id} to={el.href} className="breadcrumb">{el.name}</Link>
                            })
                        }
                    </div>
                </div>
            </nav>
        )
    }
}