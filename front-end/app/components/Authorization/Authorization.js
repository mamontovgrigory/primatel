export default class Authorization extends React.Component{
    constructor(){
        super();

        this.state ={
            notification: ""
        };
    }
    handleLoginChange(e){
        this.setState({ login: e.target.value, notification: "" });
    }
    handlePasswordChange(e){
        this.setState({ password: e.target.value, notification: "" });
    }
    authorization(){
        if(this.state && this.state.login && this.state.password){
            var self = this;
            /*AuthorizationStore.login({
                login: this.state.login,
                password: this.state.password,
                callback: function(success){
                    if(success){
                        auth.setState({ notification: "" });
                        window.location = '#/sections';
                    } else {
                        auth.setState({ notification: "Incorrect login or password" });
                    }
                }
            });*/
            window.location = '#/telephony';
        } else {
            if(this.state.login){
                $("[name='password']").focus();
            }else{
                $("[name='login']").focus();
            }
            this.setState({ notification: "Введите логин и пароль" });
        }
    }
    render(){
        return (
            <div className="row">
                <div className="col s6 offset-s3">
                    <h4 className="center-align">Авторизация</h4>
                    <div className="row">
                        <form className="col s12">
                            <div className="row">
                                <div className="input-field col s12">
                                    <i className="material-icons prefix">account_circle</i>
                                    <input id="login" name="login" type="text" className="validate"
                                           onChange={this.handleLoginChange.bind(this)} />
                                    <label htmlFor="login" className="">Логин</label>
                                </div>
                                <div className="input-field col s12">
                                    <i className="material-icons prefix">vpn_key</i>
                                    <input id="password" type="password" name="password" className="validate"
                                           onChange={this.handlePasswordChange.bind(this)} />
                                    <label htmlFor="password" className="">Пароль</label>
                                </div>
                            </div>
                            <div className="error">
                                {this.state.notification}
                            </div>
                            <div className="input-field col s12">
                                <a className="waves-effect waves-light btn right" onClick={this.authorization.bind(this)}>Войти</a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}