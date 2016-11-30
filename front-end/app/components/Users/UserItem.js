export default class UserItem extends React.Component {
    constructor(props){
        super();

        this.state = {
            id: props.id,
            login: props.login,
            isAdmin: props.isAdmin,
            groupId: props.groupId,
            groupsList: props.groupsList
        }
    }

    componentDidMount() {
        Materialize.updateTextFields();
        $('#select' + this.props.id).material_select();
        $('#select' + this.props.id).on('change', this.groupChangeHandler.bind(this));
    }

    loginChangeHandler(e) {
        this.setState({
            login: e.target.value
        });
    }

    isAdminChangeHandler(e) {
        this.setState({
            isAdmin: e.target.checked
        });
    }

    groupChangeHandler(e) {
        this.setState({
            groupId: e.target.value
        });
    }

    passwordChangeHandler(e) {
        this.setState({
            password: e.target.value
        });
    }

    saveClickHandler() {
        var self = this;
        mediator.publish(channels.USERS_SAVE, {
            id: self.state.id,
            login: self.state.login,
            isAdmin: self.state.isAdmin,
            groupId: self.state.groupId,
            password: self.state.password
        }, function () {
            self.props.usersGetList();
            mediator.publish(channels.SHELL_NOTIFICATION_SHOW, {
                text: 'Данные пользователя сохранены'
            });
        });
    }

    render() {
        return (
            <li className={this.state.id ? '' : 'active'}>
                <div className={this.state.id ? 'collapsible-header' : 'collapsible-header active'}>
                    <i className="material-icons">perm_identity</i>
                    {this.state.login}
                    {
                        this.state.isAdmin ?
                            <span className="background-system text-white p-5 m-l-5">Администратор</span>
                            :
                            null
                    }
                </div>
                <div className="collapsible-body p-10" style={this.props.id ? null : {display: 'block'}}>
                    <div className="row">
                        <div className="input-field col s6">
                            <input id={'login-' + this.state.id} type="text"
                                   defaultValue={this.state.login}
                                   onChange={this.loginChangeHandler.bind(this)}/>
                            <label htmlFor={'login-' + this.props.id}>Логин</label>
                        </div>
                        <div className="input-field col s6">
                            <select id={'select' + this.props.id} value={this.state.groupId}>
                                <option value="">Без группы</option>
                                {
                                    this.state.groupsList.map((el) => {
                                        return (
                                            <option value={el.id} key={el.id}>{el.name}</option>
                                        )
                                    })
                                }
                            </select>
                            <label>Группа</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s6">
                            <input id={'password-' + this.state.id} type="password"
                                   onChange={this.passwordChangeHandler.bind(this)}/>
                            <label
                                htmlFor={'password-' + this.state.id}>{this.state.id ? 'Новый пароль' : 'Пароль'}</label>
                        </div>
                    </div>
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