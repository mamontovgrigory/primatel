import UserItem from './UserItem';

export default class Users extends React.Component{
    constructor(){
        super();

        this.state = {
            users: []
        };
    }
    componentWillMount(){
        this.usersGetList()
    }
    componentDidMount(){
        $('.collapsible').collapsible();
    }
    usersGetList(){
        var self = this;
        mediator.publish(channels.USERS_GET_LIST, null, function(response){
            self.setState({
                users: response
            })
        });
    }
    addClickHandler(){
        var self = this;
        var userNumber = this.state.users.length + 1;
        mediator.publish(channels.USERS_SAVE, {
            login: 'user_' + userNumber
        }, function(){
            self.usersGetList();
        });
    }
    deleteClickHandler(index){
        var self = this;
        var id = self.state.users[index].id;
        mediator.publish(channels.USERS_DELETE, {
            id: id
        }, function(){
            self.usersGetList();
        });
    }
    render(){
        return (
            <div>
                <h4>Пользователи</h4>
                <ul className="collapsible popout" data-collapsible="accordion">
                    {
                        this.state.users.map((el, index) => {
                            return (
                                <UserItem key={index} {...el}
                                          deleteClickHandler={() => this.deleteClickHandler(index)}
                                          usersGetList={() => this.usersGetList()} />
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
            </div>
        );
    }
}