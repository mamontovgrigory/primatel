import './telephony.scss';

export default class Telephony extends React.Component{
    constructor(){
        super();

        this.state = {
            clients: [],
            callsTotals: []
        };
    }
    componentWillMount(){
        var self = this;
        mediator.publish(channels.CLIENTS_GET_LIST, null, function(result){
            self.setState({
                clients: result
            });
        });
    }
    componentDidMount(){
        $('.datepicker').pickadate({
            format: constants.dateFormat
        });
    }
    slideClickHandler(){
        $('#clients-block').slideToggle();
    }
    searchClickHandler(){
        var self = this;
        $('#clients-block').slideUp();
        mediator.publish(channels.TELEPHONY_GET_CALLS_TOTALS, null, function(result){
            self.setState({
                callsTotals: result
            });
        });
    }
    render(){
        return (
            <div className="section" id="telephony">
                <div className="row">
                    <div className="input-field col s3">
                        <input type="date" id="date_from" className="datepicker" />
                        <label htmlFor="date_from">Перид с</label>
                    </div>
                    <div className="input-field col s3">
                        <input type="date" id="date_to" className="datepicker" />
                        <label htmlFor="date_to">Период по</label>
                    </div>
                    <div className="input-field col s3">
                        <input type="number" id="duration" />
                        <label htmlFor="duration">Длительность, сек</label>
                    </div>
                    <div className="col s3 note">
                        Обновлено 13:08:59 13:08:2016
                    </div>
                </div>
                <div className="row" id="clients-block">
                    <div className="divider"></div>
                    <h4>Клиенты</h4>
                    {
                        this.state.clients.map((el) => {
                            return (
                                <div className="input-field col s3" key={el.id}>
                                    <input type="checkbox" id={"client" + el.id} value={el.id} />
                                    <label htmlFor={"client" + el.id}>{el.name}</label>
                                </div>
                            )
                        })
                    }
                </div>
                <div className="clear">
                    <a className="waves-effect waves-light btn right m-l-10" onClick={this.searchClickHandler.bind(this)}>Поиск</a>
                    <a className="waves-effect waves-light btn right" onClick={this.slideClickHandler.bind(this)}>
                        <i className="material-icons">swap_vert</i>
                    </a>
                </div>
                <div>
                    <table className="bordered">
                        <tbody>
                            {
                                this.state.callsTotals.map((el) => {
                                    return (
                                        <tr key={el.id}>
                                            <th>{el.name}</th>
                                            {
                                                el.data.map((cell) => {
                                                    return <td className="center info-cell">{cell}</td>
                                                })
                                            }
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}