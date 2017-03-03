import {Link} from 'react-router';

export default class Navbar extends React.Component {
    constructor() {
        super();

        this.state = {
            modules: []
        }
    }

    componentWillMount() {
        var self = this;
        mediator.publish(channels.NAVIGATION_GET_ITEMS, null, function (response) {
            self.setState({
                modules: response
            });
        });
    }

    componentDidMount() {
        $(".side-nav-collapse").sideNav();
        $(".dropdown-button").dropdown();

        $('.side-nav-close').on('click', function () {
            $('.side-nav').sideNav('hide');
        });
    }

    logoutClickHandler() {
        system.user = null;
        $.removeCookie('login');
        $.removeCookie('isAdmin');
        window.location = '#/';
        window.location.reload();
    }

    render() {
        var user = system.user;
        return (
            <nav>
                <div className="nav-wrapper container">
                    <a href="#" className="brand-logo right" style={{height: '64px'}}>
                        <img src={require('./content/logo.png')}/>
                    </a>
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
                        <Link to="/" className="side-nav-close display-inline-block p-l-0">
                            <img className="background" src={require('./content/crm.png')}/>
                        </Link>
                    </li>
                    {
                        this.state.modules.map((el, index) => {
                            return (
                                <li key={index}>
                                    <Link to={el.to} className="waves-effect side-nav-close">
                                        <i className="material-icons">{el.icon}</i>
                                        {el.name}
                                    </Link>
                                </li>
                            )
                        })
                    }
                    <li>
                        <div className="divider"></div>
                    </li>
                    <li><a className="waves-effect side-nav-close">Закрыть</a></li>
                </ul>
            </nav>
        );
    }
}