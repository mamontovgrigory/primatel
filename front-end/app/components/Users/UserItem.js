export default class UserItem extends React.Component{
    componentWillMount(){
        this.setState({
            id: this.props.id,
            login: this.props.login,
            isAdmin: this.props.isAdmin
        });
    }
    componentDidMount(){
        Materialize.updateTextFields();
    }
    loginChangeHandler(e){
        this.setState({
           login: e.target.value
        });
    }
    isAdminChangeHandler(e){
        this.setState({
            isAdmin: e.target.checked
        });
    }
    passwordChangeHandler(e){
        this.setState({
            password: e.target.value
        });
    }
    saveClickHandler(){
        var self = this;
        mediator.publish(channels.USERS_SAVE, _.assignIn({
            id: this.props.id
        }, this.state), function(){
            self.props.usersGetList();
            mediator.publish(channels.SHELL_NOTIFICATION_SHOW, {
                text: 'Данные пользователя сохранены'
            });
        });
    }
    render(){
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
                                   onChange={this.loginChangeHandler.bind(this)} />
                            <label htmlFor={'login-' + this.props.id}>Логин</label>
                        </div>
                        <div className="input-field col s6">
                            <input id={'is-admin-' + this.state.id} type="checkbox"
                                   defaultChecked={this.state.isAdmin}
                                   onChange={this.isAdminChangeHandler.bind(this)} />
                            <label htmlFor={'is-admin-' + this.props.id}>Администратор</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s6">
                            <input id={'password-' + this.state.id} type="password"
                                   onChange={this.passwordChangeHandler.bind(this)} />
                            <label htmlFor={'password-' + this.state.id}>{this.state.id ? 'Новый пароль' : 'Пароль'}</label>
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