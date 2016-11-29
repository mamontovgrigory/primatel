export default class UserItem extends React.Component {
    constructor(props) {
        super();

        /*var setting = _.find(this.state.values, function (v) {
            return parseInt(v.permissionId) === parseInt(el.id);
        });
        var value = el.list ? [] : false;
        if(setting){
            if (el.list) {
                value = setting.value.split(',');
            } else {
                value = setting.value === 'true';
            }
        }
        console.log(setting, value);*/

        var settings = {};
        _.forEach(props.values, function(val, i){
            var permission = _.find(props.permissions, function(p){
                return parseInt(p.id) === parseInt(val.permissionId);
            });
            var value = permission.list ? [] : false;
            if (permission.list) {
                value = _.map(val.value.split(','), function(v){
                    return parseInt(v);
                });
            } else {
                value = val.value === 'true';
            }
            settings[parseInt(permission.id)] = value;
        });

        console.log(settings);

        this.state = {
            id: props.id,
            name: props.name,
            permissions: props.permissions,
            settings: settings
        }
    }

    componentDidMount() {
        Materialize.updateTextFields();
    }

    nameChangeHandler(e) {
        this.setState({
            name: e.target.value
        });
    }

    isAdminChangeHandler(e) {
        this.setState({
            isAdmin: e.target.checked
        });
    }

    passwordChangeHandler(e) {
        this.setState({
            password: e.target.value
        });
    }

    saveClickHandler() {
        var self = this;
        mediator.publish(channels.GROUPS_SAVE, {
            id: this.state.id,
            name: this.state.name,
            settings: this.state.settings
        }, function () {
            self.props.groupsGetList();
            mediator.publish(channels.SHELL_NOTIFICATION_SHOW, {
                text: 'Данные группы сохранены'
            });
        });
    }

    permissionCheckboxChangeHandler(e) {
        var settings = this.state.settings;
        settings[e.target.name] = e.target.checked;
        this.setState({
            settings: settings
        });
    }

    selectAllCheckboxChangeHandler() {

    }

    listItemCheckboxChangeHandler(permissionId, listItemId, e) {
        var settings = this.state.settings;
        listItemId = parseInt(listItemId);
        var itemsList = settings[permissionId] ? settings[permissionId] : [];
        if (e.target.checked) {
            itemsList.push(listItemId);
        } else {
            itemsList = _.without(itemsList, listItemId);
        }
        settings[permissionId] = itemsList;
        this.setState({
            settings: settings
        });
    }

    render() {
        return (
            <li className={this.state.id ? '' : 'active'}>
                <div className={this.state.id ? 'collapsible-header' : 'collapsible-header active'}>
                    <i className="material-icons">supervisor_account</i>
                    {this.state.name}
                </div>
                <div className="collapsible-body p-10" style={this.props.id ? null : {display: 'block'}}>
                    <div className="row m-b-0">
                        <div className="input-field col s6">
                            <input id={'name-' + this.state.id} type="text"
                                   defaultValue={this.state.name}
                                   onChange={this.nameChangeHandler.bind(this)}/>
                            <label htmlFor={'name-' + this.props.id}>Имя группы</label>
                        </div>
                    </div>
                    <div className="row m-b-0">
                        <div className="input-field col s12">
                            <h5>Права</h5>
                        </div>
                    </div>
                    {
                        this.state.permissions.map((el) => {
                            var checkboxId = this.state.id + el.id;
                            var value = this.state.settings[parseInt(el.id)];
                            return (
                                el.list ?
                                    <div key={el.id}>
                                        <div className="row m-b-0 m-t-10">
                                            <div className="input-field col s12">
                                                <h5 className="m-b-0">{el.name}</h5>
                                            </div>
                                        </div>
                                        {
                                            /*<div className="row">
                                             <div className="input-field col s12 clear-both">
                                             <input type="checkbox" id={"all" + el.id}
                                             onChange={() => this.selectAllCheckboxChangeHandler()}/>
                                             <label htmlFor={"all" + el.id}>Выбрать все</label>
                                             </div>
                                             </div>*/
                                        }
                                        <div className="divider"></div>
                                        <div className="row">
                                            {
                                                el.list.map((li) => {
                                                    var listCheckboxId = this.state.id + el.id + li.id;
                                                    var checked = _.indexOf(value, parseInt(li.id)) !== -1;
                                                    return (
                                                        <div className="input-field col s3" key={li.id}>
                                                            <input type="checkbox" id={"li" + listCheckboxId}
                                                                   value={li.id}
                                                                   defaultChecked={checked}
                                                                   onChange={this.listItemCheckboxChangeHandler.bind(this, el.id, li.id)}/>
                                                            <label htmlFor={"li" + listCheckboxId}>{li.name}</label>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                    :
                                    <div className="row m-b-0" key={el.id}>
                                        <div className="input-field col s12">
                                            <input type="checkbox" id={"permission" + checkboxId} name={el.id}
                                                   value={el.id}
                                                   defaultChecked={value}
                                                   onChange={this.permissionCheckboxChangeHandler.bind(this)}/>
                                            <label htmlFor={"permission" + checkboxId}>{el.name}</label>
                                        </div>
                                    </div>
                            )
                        })
                    }
                    <div className="row">
                        <div className="input-field col s12">
                            <a className="waves-effect waves-light btn right m-l-10"
                               onClick={this.saveClickHandler.bind(this)}>Сохранить</a>
                            <a className="waves-effect waves-light btn right"
                               onClick={this.props.deleteClickHandler.bind(this)}>Удалить</a>
                        </div>
                    </div>
                </div>
            </li>
        )
    }
}