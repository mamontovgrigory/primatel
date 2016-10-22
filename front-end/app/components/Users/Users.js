import UserItem from './UserItem';

export default class Users extends React.Component {
    constructor() {
        super();

        this.state = {
            currentUser: {},
            users: []
        };
    }

    componentWillMount() {
        this.usersGetList()
    }

    componentDidMount() {
        $('.collapsible').collapsible();
    }

    usersGetList() {
        var self = this;
        mediator.publish(channels.USERS_GET_LIST, null, function (response) {
            self.setState({
                users: response
            })
        });
    }

    addClickHandler() {
        var self = this;
        var userNumber = this.state.users.length + 1;
        mediator.publish(channels.USERS_SAVE, {
            login: 'user_' + userNumber
        }, function () {
            self.usersGetList();
        });
    }

    deleteClickHandler(index) {
        var self = this;

        var $modal = $('#confirm-modal');
        $modal.openModal();

        self.setState({
            currentUser: self.state.users[index]
        });
    }

    deleteConfirm() {
        var self = this;
        mediator.publish(channels.USERS_DELETE, {
            id: self.state.currentUser.id
        }, function () {
            self.usersGetList();
        });
    }

    render() {
        return (
            <div>
                <h4>Пользователи</h4>
                <ul className="collapsible popout" data-collapsible="accordion">
                    {
                        this.state.users.map((el, index) => {
                            return (
                                <UserItem key={index} {...el}
                                          deleteClickHandler={() => this.deleteClickHandler(index)}
                                          usersGetList={() => this.usersGetList()}/>
                            )
                        })
                    }
                </ul>

                <div>
                    <button className="btn waves-effect waves-light"
                            onClick={this.addClickHandler.bind(this)}>
                        <span>Добавить</span>
                        <i className="material-icons right">playlist_add</i>
                    </button>
                </div>

                <div id="confirm-modal" className="modal">
                    <div className="modal-content">
                        <h4>Удалить пользователя?</h4>
                        <p>Вы действительно хотите удалить пользователя {this.state.currentUser.login}</p>
                    </div>
                    <div className="modal-footer">
                        <a className="modal-action modal-close waves-effect waves-light btn">Нет</a>
                        <a className="modal-action modal-close waves-effect waves-light btn m-r-10"
                           onClick={this.deleteConfirm.bind(this)}>Да</a>
                    </div>
                </div>
            </div>
        );
    }
}