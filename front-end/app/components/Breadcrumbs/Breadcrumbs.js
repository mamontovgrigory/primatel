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
        if(self.breadcrumbs.length){
            return (
                <nav className="panel row">
                    <div className="nav-wrapper container">
                        <div className="col s12">
                            {
                                self.breadcrumbs.map((el, index) => {
                                    return <Link key={index} to={el.href} className="breadcrumb">{el.name}</Link>
                                })
                            }
                        </div>
                    </div>
                </nav>
            )
        }else{
            return <div></div>;
        }

    }
}