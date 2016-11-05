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
            rowNum: 50
        };
    }
    componentWillMount(){
        var self = this;
        mediator.publish(channels.TELEPHONY_GET_LIST_USERS, null, function(result){
            self.setState({
                loginList: result
            });
        });

        mediator.publish(channels.TELEPHONY_GET_UPDATE_DATE, null, function(result){
            self.setState({
                updateDate: result.datetime
            });
        });
    }
    durationChangeHandler(e){
        this.setState({
            duration: e.target.value
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
        if(Materialize.updateTextFields && typeof(Materialize.updateTextFields) === 'function') Materialize.updateTextFields();
    }
    componentDidUpdate(){
        //$('audio').audioPlayer();
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
            'loginIds': self.state.loginIds,
            'from': self.state.from,
            'to': self.state.to,
            'duration': self.state.duration
        }, function(result){
            self.setState({
                callsTotals: result
            });
        });
    }
    infoCellClickHandler(login, date, duration){
        var self = this;
        var loginObj = _.find(self.state.loginList, function(c){
            return c.login === login;
        });

        self.setPage(1);
        mediator.publish(channels.TELEPHONY_GET_CALLS_DETAILS, {
            loginId: loginObj.id,
            date: date,
            duration: duration
        }, function(result){
            self.setState({
                chosenLogin: login,
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
    filterDurationChangeHandler(e){
        this.setPage(1);
        this.setCallDetailsFilter('duration', e.target.value);
    }
    loadRecordClickHandler(login, callid, time){
        $('#' + callid).replaceWith($('<img>', {
            'id': callid,
            'src': require('./content/loader.gif')
        }));
        mediator.publish(channels.TELEPHONY_GET_CALL_RECORD, {
            login: login,
            callid: callid
        }, function(response){
            if(response){
                $('#' + callid).replaceWith($('<audio>', {
                    'id': callid,
                    'src': system.serverUrl + response.src
                }));
                $('#' + callid).parent().append($('<a>', {
                    download: login + ' ' + time,
                    href: system.serverUrl + response.src,
                    html: 'Скачать'
                }));
                $('#' + callid).audioPlayer();
            }else{
                $('#' + callid).replaceWith($('<span>', {
                    'id': callid,
                    'html': 'Нет данных'
                }));
            }
        });
    }
    setPage(page){
        var self = this;
        self.setState({
            page: 0
        });
        setTimeout(function(){
            self.setState({
                page: page
            });
        }, 1);
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
                if(i === 1 || (i >= self.state.page - 2 && i <= self.state.page + 2) || i === pagesCount){
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
                        <label htmlFor="date-from" className="active">Перид с</label>
                    </div>
                    <div className="input-field col s3">
                        <input type="date" id="date-to" className="datepicker"
                               defaultValue={this.state.to} />
                        <label htmlFor="date-to" className="active">Период по</label>
                    </div>
                    <div className="input-field col s3">
                        <input type="number" id="duration" onChange={this.durationChangeHandler.bind(this)} />
                        <label htmlFor="duration">Длительность, сек</label>
                    </div>
                    <div className="col s3 note">
                        {this.state.updateDate ? 'Обновлено ' + moment(this.state.updateDate).format(system.format.datetime) : ''}
                    </div>
                </div>
                <div className="row" id="loginList-block">
                    <div className="divider"></div>
                    <h4>Клиенты</h4>
                    {
                        this.state.loginList.map((el) => {
                            return (
                                <div className="input-field col s3" key={el.id}>
                                    <input type="checkbox" id={"login" + el.id} value={el.id}
                                           onChange={() => self.loginCheckboxChangeHandler(el.id)}/>
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
                                Object.keys(this.state.callsTotals.data).map(function(login, index) {
                                    var loginData = self.state.callsTotals.data[login];
                                    return (
                                        <tr key={index}>
                                            <th>{login}</th>
                                            {
                                                loginData.map((el, i) => {
                                                    var className = parseInt(el) !== 0 ? 'info-cell' : '';
                                                    var duration = self.state.duration;
                                                    return <td className={'center ' + className}
                                                               key={i}
                                                               onClick={parseInt(el) ? () => self.infoCellClickHandler(login, self.state.callsTotals.dates[i], duration) : function(){}}>{el}</td>
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
                        <div>
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
                                               onChange={this.filterDurationChangeHandler.bind(this)}/>
                                    </td>
                                    <td></td>
                                </tr>
                                {
                                    callsDetailsSlice.map((el, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{moment(el.time).format(system.format.datetime)}</td>
                                                <td>{el.numfrom}</td>
                                                <td>{el.numto}</td>
                                                <td>{el.duration}</td>
                                                <td style={{'minWidth': '300px'}}>
                                                    {
                                                        el.duration > 0 ?
                                                            <a className="waves-effect waves-light btn test"
                                                               id={el.callid}
                                                               onClick={() => this.loadRecordClickHandler(this.state.chosenLogin, el.callid, el.time)}>Загрузить</a>
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
                        </div>
                        <ul className="pagination text-center">
                            {
                                this.state.page !== 1 && self.state.callsDetails.length ?
                                    <li className="disabled">
                                        <a className="waves-effect"
                                           onClick={() => self.setPage(this.state.page - 1)}>
                                            <i className="material-icons">chevron_left</i>
                                        </a>
                                    </li>
                                    : null
                            }
                            {
                                pagesArr.map((el, index) => {
                                    var className = el === null ? '' : 'waves-effect';
                                    if(el === this.state.page)
                                        className += ' active';
                                    return (
                                        <li key={index} className={className}>
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
                                pagesCount !== this.state.page && self.state.callsDetails.length ?
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