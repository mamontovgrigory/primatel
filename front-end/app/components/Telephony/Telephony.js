import './telephony.scss';

export default class Telephony extends React.Component{
    constructor(){
        super();

        this.state = {
            clients: [],
            callsTotals: [],
            callsDetails: []
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
    infoCellClickHandler(){
        var self = this;
        mediator.publish(channels.TELEPHONY_GET_CALLS_DETAILS, null, function(result){
            self.setState({
                callsDetails: result
            });
            var $modal = $('#modal1');
            $modal.openModal({
                ready: function() {
                    $('audio').audioPlayer();
                },
                complete: function() {
                    self.setState({
                        callsDetails: []
                    });
                }
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
                                                    return <td className="center info-cell" onClick={() => this.infoCellClickHandler()}>{cell}</td>
                                                })
                                            }
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>

                <div id="modal1" className="modal modal-fixed-footer">
                    <div className="modal-content">
                        <h4>Ауди Варшавка 06.08.2016</h4>
                        <table className="bordered">
                            <tbody>
                                <tr>
                                    <td className="text-center">Дата и время</td>
                                    <td className="text-center">Исходящий</td>
                                    <td className="text-center">Входящий</td>
                                    <td className="text-center">Длительность</td>
                                    <td className="text-center">Запись</td>
                                </tr>
                                {
                                    this.state.callsDetails.map((el) => {
                                        return (
                                            <tr>
                                                <td>{el.datetime}</td>
                                                <td>{el.numFrom}</td>
                                                <td>{el.numTo}</td>
                                                <td>{el.duration}</td>
                                                <td style={{'minWidth': '300px'}}><audio src={require('./content/02_rammstein_gib_mir_deine_augen_myzuka.fm.mp3')}></audio></td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                    <div className="modal-footer">
                        <a className="modal-action modal-close waves-effect waves-light btn">Закрыть</a>
                    </div>
                </div>
            </div>
        );
    }
}