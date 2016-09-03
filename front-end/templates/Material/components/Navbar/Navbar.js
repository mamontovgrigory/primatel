export default class Navbar extends React.Component{
    componentDidMount(){
        $(".side-nav-collapse").sideNav();

        $('.side-nav-close').on('click', function(){
            $('.side-nav').sideNav('hide');
        });
    }
    render(){
        return (
            <nav>
                <div className="nav-wrapper container">
                    <a href="#" className="brand-logo right">Primatel 2.0</a>
                    <ul className="left">
                        <li>
                            <a data-activates="slide-out" className="side-nav-collapse">
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