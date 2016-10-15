import { Link } from 'react-router';

export default class Main extends React.Component{
    constructor(){
        super();

        this.state = {
            modules:[]
        }
    }
    componentWillMount(){
        var self = this;
        mediator.publish(channels.NAVIGATION_GET_ITEMS, null, function(response){
            self.setState({
                modules: response
            });
        });
    }
    render(){
        return (
            <div className="section">
                {
                    this.state.modules.map((el, index) => {
                        return (
                            el.path !== 'index' ?
                                <div className="card-wrapper" key={index}>
                                    <div className="card sticky-action">
                                        <div className="card-image waves-effect waves-block waves-light">
                                            <img className="activator" src={el.src} />
                                        </div>
                                        <div className="card-content">
                                            <span className="card-title activator grey-text text-darken-4">
                                                {el.name}
                                                <i className="material-icons right">more_vert</i>
                                            </span>
                                        </div>
                                        <div className="card-action">
                                            <Link to={el.to}>Перейти</Link>
                                        </div>
                                        <div className="card-reveal">
                                            <span className="card-title grey-text text-darken-4">
                                                {el.name}
                                                <i className="material-icons right">close</i>
                                            </span>
                                            <p>{el.description}</p>
                                        </div>
                                    </div>
                                </div>
                                :
                                null
                        )
                    })
                }
            </div>
        )
    }
}