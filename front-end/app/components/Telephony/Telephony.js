import './telephony.scss';

export default class Telephony extends React.Component{
    constructor(){
        super();

        this.dateFormat = "YYYY-MM-DD";
        this.state = {
            from: moment().add(-7, 'days').format(system.format.date),
            to: moment().format(system.format.date),
            loginList: [],
            loginIds: [],
            callsTotals: {
                dates: [],
                data: []
            },
            callsDetails: [],
            callsDetailsFilter: {},
            page: 1,
            rowNum: 10
        };
    }
    componentWillMount(){
        var self = this;
        mediator.publish(channels.TELEPHONY_GET_LIST_USERS, null, function(result){
            self.setState({
                loginList: result
            });
        });
    }
    componentDidMount(){
        var self = this;

        $('#date-from').pickadate({
            format: constants.dateFormat,
            onSet: function(result) {
                var date = result.select;
                self.setState({
                    from: moment(date).format(self.dateFormat)
                });
            }
        });
        $('#date-to').pickadate({
            format: constants.dateFormat,
            onSet: function(result) {
                var date = result.select;
                self.setState({
                    to: moment(date).format(self.dateFormat)
                });
            }
        });
        Materialize.updateTextFields();
    }
    componentDidUpdate(){
        var audioInitializedClass = 'audio-initialized';
        $('audio').not('.'+ audioInitializedClass).addClass(audioInitializedClass).audioPlayer();
    }
    slideClickHandler(){
        $('#loginList-block').slideToggle();
    }
    loginCheckboxChangeHandler(loginId){
        var index = _.findIndex(this.state.loginIds, function(u){
            return u === loginId;
        });
        if(index === -1){
            this.state.loginIds.push(loginId);
        } else {
            this.state.loginIds.splice(index, 1);
        }
    }
    searchClickHandler(){
        var self = this;
        $('#loginList-block').slideUp();
        mediator.publish(channels.TELEPHONY_GET_CALLS_TOTALS, {
            "loginIds": self.state.loginIds,
            "from": self.state.from,
            "to": self.state.to
        }, function(result){
            self.setState({
                callsTotals: result
            });
        });
    }
    infoCellClickHandler(login, date){
        var self = this;
        var loginObj = _.find(self.state.loginList, function(c){
            return c.login === login;
        });

        self.setPage(1);
        mediator.publish(channels.TELEPHONY_GET_CALLS_DETAILS, {
            loginId: loginObj.id,
            date: date
        }, function(result){
            self.setState({
                callsDetails: result
            });
            var $modal = $('#modal1');
            $modal.find('h4').html(login + ' ' + moment(date).format(system.format.date));
            $modal.openModal({
                ready: function() {
                    //$('audio').audioPlayer();
                },
                complete: function() {
                    self.setState({
                        callsDetails: []
                    });
                }
            });
        });
    }
    setCallDetailsFilter(key, value){
        if(key){
            var callsDetailsFilter = this.state.callsDetailsFilter;
            callsDetailsFilter[key] = value;
            this.setState({
                callsDetailsFilter: callsDetailsFilter
            });
        }
    }
    timeChangeHandler(e){
        this.setPage(1);
        this.setCallDetailsFilter('time', e.target.value);
    }
    numfromChangeHandler(e){
        this.setPage(1);
        this.setCallDetailsFilter('numfrom', e.target.value);
    }
    numtoChangeHandler(e){
        this.setPage(1);
        this.setCallDetailsFilter('numto', e.target.value);
    }
    durationChangeHandler(e){
        this.setPage(1);
        this.setCallDetailsFilter('duration', e.target.value);
    }
    setPage(page){
        this.setState({
            page: page
        });
    }
    render(){
        var self = this;

        var callsDetails = _.filter(self.state.callsDetails, function(c){
            var valid = true;
            _.forEach(self.state.callsDetailsFilter, function(value, key){
                if(value && c[key].indexOf(value) === -1){
                    valid = false;
                }
            });
            return valid;
        });

        var rowTotal = callsDetails.length;
        var pagesCount = Math.ceil(rowTotal/this.state.rowNum);
        var pagesArr = [];
        if(pagesCount > 1){
            for(var i = 1; i <= pagesCount; i++){
                if(i === 1 || (i >= this.state.page - 2 && i <= this.state.page + 2) || i === pagesCount){
                    pagesArr.push(i);
                }else if (pagesArr[pagesArr.length - 1] !== null){
                    pagesArr.push(null);
                }
            }
        }

        var pageIndex = (this.state.page - 1) * this.state.rowNum;
        var callsDetailsSlice = callsDetails.slice(pageIndex, pageIndex + this.state.rowNum);

        return (
            <div className="section" id="telephony">
                <div className="row">
                    <div className="input-field col s3">
                        <input type="date" id="date-from" className="datepicker"
                               defaultValue={this.state.from} />
                        <label htmlFor="date-from">Перид с</label>
                    </div>
                    <div className="input-field col s3">
                        <input type="date" id="date-to" className="datepicker"
                               defaultValue={this.state.to} />
                        <label htmlFor="date-to">Период по</label>
                    </div>
                    <div className="input-field col s3 hide">
                        <input type="number" id="duration" />
                        <label htmlFor="duration">Длительность, сек</label>
                    </div>
                    <div className="col s3 note">
                        Обновлено 13:08:59 13:10:2016
                    </div>
                </div>
                <div className="row" id="loginList-block">
                    <div className="divider"></div>
                    <h4>Клиенты</h4>
                    {
                        this.state.loginList.map((el) => {
                            return (
                                <div className="input-field col s3" key={el.id}>
                                    <input type="checkbox" id={"login" + el.id} value={el.id} onChange={() => self.loginCheckboxChangeHandler(el.id)}/>
                                    <label htmlFor={"login" + el.id}>{el.login}</label>
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
                <div className="overflow-auto clear-both p-t-10">
                    <table className={this.state.callsTotals.dates.length === 0 ? "hide" : "bordered"}>
                        <tbody>
                            <tr>
                                <th>Клиенты</th>
                                {
                                    this.state.callsTotals.dates.map((el, index) => {
                                        return (
                                            <th key={index}>{moment(el).format(system.format.date)}</th>
                                        )
                                    })
                                }
                            </tr>
                            {
                                Object.keys(this.state.callsTotals.data).map(function(login) {
                                    var loginData = self.state.callsTotals.data[login];
                                    return (
                                        <tr>
                                            <th>{login}</th>
                                            {
                                                loginData.map((el, i) => {
                                                    return <td className="center info-cell"
                                                               onClick={() => self.infoCellClickHandler(login, self.state.callsTotals.dates[i])}>{el}</td>
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
                        <h4></h4>
                        <table className="bordered">
                            <tbody>
                                <tr>
                                    <td>Дата и время</td>
                                    <td>Исходящий</td>
                                    <td>Входящий</td>
                                    <td>Длительность</td>
                                    <td>Запись</td>
                                </tr>
                                <tr>
                                    <td>
                                        <input type="text" id="datetime" className="m-b-0"
                                               onChange={this.timeChangeHandler.bind(this)}/>
                                    </td>
                                    <td>
                                        <input type="text" id="numfrom" className="m-b-0"
                                               onChange={this.numfromChangeHandler.bind(this)}/>
                                    </td>
                                    <td>
                                        <input type="text" id="numto" className="m-b-0"
                                               onChange={this.numtoChangeHandler.bind(this)}/>
                                    </td>
                                    <td>
                                        <input type="text" id="duration" className="m-b-0"
                                               onChange={this.durationChangeHandler.bind(this)}/>
                                    </td>
                                    <td></td>
                                </tr>
                                {
                                    callsDetailsSlice.map((el) => {
                                        return (
                                            <tr>
                                                <td>{moment(el.time).format(system.format.time)}</td>
                                                <td>{el.numfrom}</td>
                                                <td>{el.numto}</td>
                                                <td>{el.duration}</td>
                                                <td style={{'minWidth': '300px'}}>
                                                    {
                                                        el.duration > 0 ?
                                                            <audio src={system.serverUrl + '/ajax/records/' + el.callid + '.mp3'} />
                                                        :
                                                            <span>Нет записи</span>
                                                    }
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                        <ul className="pagination text-center">
                            {
                                this.state.page !== 1 ?
                                    <li className="disabled">
                                        <a className="waves-effect"
                                           onClick={() => self.setPage(this.state.page - 1)}>
                                            <i className="material-icons">chevron_left</i>
                                        </a>
                                    </li>
                                    : null
                            }
                            {
                                pagesArr.map((el) => {
                                    var className = el === null ? '' : 'waves-effect';
                                    if(el === this.state.page)
                                        className += ' active';
                                    return (
                                        <li className={className}>
                                            {
                                                el === null ?
                                                    <a>...</a>
                                                    :
                                                    <a onClick={() => self.setPage(el)}>{el}</a>
                                            }
                                        </li>
                                    )
                                })
                            }
                            {
                                pagesCount !== this.state.page ?
                                    <li className="waves-effect">
                                        <a className="waves-effect"
                                           onClick={() => self.setPage(this.state.page + 1)}>
                                            <i className="material-icons">chevron_right</i>
                                        </a>
                                    </li>
                                    : null
                            }
                        </ul>
                    </div>
                    <div className="modal-footer">
                        <a className="modal-action modal-close waves-effect waves-light btn">Закрыть</a>
                    </div>
                </div>
            </div>
        );
    }
}