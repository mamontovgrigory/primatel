export default class Navbar extends React.Component{
    constructor(){
        super();
    }
    componentDidMount(){
        $(".side-nav-collapse").sideNav();

        $('.side-nav-close').on('click', function(){
            $('.side-nav').sideNav('hide');
        });
    }
    logoutClickHandler(){
        system.user = null;
        $.removeCookie('login');
        $.removeCookie('isAdmin');
        window.location = '#/';
    }
    render(){
        var user = system.user;
        return (
            <nav>
                <div className="nav-wrapper container">
                    <a href="#" className="brand-logo right">Primatel 2.0</a>
                    <ul id="dropdown-user" className="dropdown-content">
                        <li><a onClick={this.logoutClickHandler.bind(this)}>Выйти</a></li>
                    </ul>
                    {
                        user ?
                            <ul className="right">
                                <li>
                                    <a className="dropdown-button" data-activates="dropdown-user">
                                        <div className="chip">
                                            {user.login}
                                        </div>
                                        <i className="material-icons right">arrow_drop_down</i>
                                    </a>
                                </li>
                            </ul>
                            :
                            null
                    }
                    <ul className="left">
                        <li>
                            <a data-activates="slide-out" className="side-nav-collapse" hidden={!system.user}>
                                <i className="material-icons">menu</i>
                            </a>
                        </li>
                    </ul>
                </div>

                <ul id="slide-out" className="side-nav">
                    <li>
                        <a href="#/" className="side-nav-close display-inline-block p-l-0">
                            <img className="background" src={require('./content/crm.png')} />
                        </a>
                    </li>
                    <li><a href="#/users" className="waves-effect side-nav-close"><i className="material-icons">recent_actors</i>Пользователи</a></li>
                    <li><a href="#/telephony" className="waves-effect side-nav-close"><i className="material-icons">phone</i>Телефония</a></li>
                    <li><div className="divider"></div></li>
                    <li><a className="waves-effect side-nav-close">Закрыть</a></li>
                </ul>
            </nav>
        );
    }
}