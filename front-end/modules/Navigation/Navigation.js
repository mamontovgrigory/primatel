class Navigation{
    getItems(properties, callback){
        var items = [
            {
                name: 'Пользователи',
                icon: 'perm_identity',
                to: 'users',
                src: require('./content/users.png'),
                description: 'Создание, редактирование и удаление пользователей системы',
                roles: [ 'admin' ]
            },
            {
                name: 'Настройки групп',
                icon: 'supervisor_account',
                to: 'groups',
                src: require('./content/groups.png'),
                description: 'Настройки прав доступа',
                roles: [ 'admin' ]
            },
            /*{
                name: 'Личные кабинеты',
                icon: 'contact_phone',
                to: 'accounts',
                src: require('./content/accounts.png'),
                description: 'Личные кабинеты телефонии',
                roles: [ 'admin' ]
            },*/
            {
                name: 'Телефония',
                icon: 'phone',
                to: 'telephony',
                src: require('./content/telephony.png'),
                description: 'Просмотр статистики и прослушивание записей телефонии',
                roles: [ 'admin', 'user' ]
            }
        ];

        items = _.filter(items, function(i){
            var valid = false;
            if(system.user){
                valid = _.indexOf(i.roles, system.user.isAdmin ? 'admin' : 'user') !== -1;
            }
            return valid;
        });

        callback(items);
    }
}

module.exports = new Navigation();