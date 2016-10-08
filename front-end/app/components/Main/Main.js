import { Link } from 'react-router';

export default class Main extends React.Component{
    constructor(){
        super();

        this.state = {
            modules:[
                {
                    name: 'Пользователи',
                    to: 'users',
                    src: require('./content/users.png'),
                    text: 'Создание, редактирование и удаление пользователей системы'
                },
                {
                    name: 'Телефония',
                    to: 'telephony',
                    src: require('./content/telephony.png'),
                    text: 'Просмотр статистики и прослушивание записей телефонии'
                }
            ]
        }
    }
    render(){
        return (
            <div className="section">
                {
                    this.state.modules.map((el) => {
                        return (
                            el.path !== 'index' ?
                                <div className="card-wrapper">
                                    <div className="card sticky-action">
                                        <div className="card-image waves-effect waves-block waves-light">
                                            <img className="activator" src={el.src} />
                                        </div>
                                        <div className="card-content">
                                            <span className="card-title activator grey-text text-darken-4">
                                                {el.name}
                                                <i className="material-icons right">more_vert</i>
                                            </span>
                                        </div>
                                        <div className="card-action">
                                            <Link to={el.to}>Перейти</Link>
                                        </div>
                                        <div className="card-reveal">
                                            <span className="card-title grey-text text-darken-4">
                                                {el.name}
                                                <i className="material-icons right">close</i>
                                            </span>
                                            <p>{el.text}</p>
                                        </div>
                                    </div>
                                </div>
                                :
                                null
                        )
                    })
                }
            </div>
        )
    }
}