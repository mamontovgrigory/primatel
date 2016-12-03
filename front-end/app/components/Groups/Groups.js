import GroupItem from './GroupItem';

export default class Security extends React.Component{
    constructor() {
        super();

        this.state = {
            currentGroup: {},
            groups: []
        };
    }

    componentWillMount() {
        this.groupsGetList()
    }

    componentDidMount() {
        $('.collapsible').collapsible();
    }

    groupsGetList() {
        var self = this;
        mediator.publish(channels.GROUPS_GET_LIST, null, function (response) {
            self.setState({
                currentGroup: {},
                groups: []
            });
            self.setState({
                currentGroup: {},
                groups: response
            });
        });
    }

    addClickHandler() {
        var self = this;

        var groupNumber = this.state.groups.length,
            namePrefix = 'group_',
            groupName = '';
        var isUnique = false;
        do {
            groupNumber++;
            groupName = namePrefix + groupNumber;
            isUnique = _.find(this.state.groups, function (u) {
                return u.name === groupName;
            });
            isUnique = !isUnique;
        } while (!isUnique);
        
        mediator.publish(channels.GROUPS_SAVE, {
            name: 'group_' + groupNumber
        }, function () {
            self.groupsGetList();
        });
    }

    deleteClickHandler(index) {
        var self = this;

        var $modal = $('#confirm-modal');
        $modal.openModal();

        self.setState({
            currentGroup: self.state.groups[index]
        });
    }

    deleteConfirm() {
        var self = this;
        mediator.publish(channels.GROUPS_DELETE, {
            id: self.state.currentGroup.id
        }, function () {
            self.groupsGetList();
        });
    }

    render() {
        return (
            <div>
                <h4>Группы</h4>
                <ul className="collapsible popout" data-collapsible="accordion">
                    {
                        this.state.groups.map((el, index) => {
                            return (
                                <GroupItem key={index} {...el}
                                          deleteClickHandler={() => this.deleteClickHandler(index)}
                                          groupsGetList={() => this.groupsGetList()}/>
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
                        <p>Вы действительно хотите удалить группу {this.state.currentGroup.login}?</p>
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