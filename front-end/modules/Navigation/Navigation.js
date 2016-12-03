class Navigation {
    getItems(properties, callback) {
        var items = [
            {
                name: 'Пользователи',
                icon: 'perm_identity',
                to: 'users',
                src: require('./content/users.png'),
                description: 'Создание, редактирование и удаление пользователей системы',
                rule: "users_manage"
            },
            {
                name: 'Настройки групп',
                icon: 'supervisor_account',
                to: 'groups',
                src: require('./content/groups.png'),
                description: 'Настройки прав доступа',
                rule: "groups_manage"
            },
            {
                name: 'Телефония',
                icon: 'phone',
                to: 'telephony',
                src: require('./content/telephony.png'),
                description: 'Просмотр статистики и прослушивание записей телефонии'
            }
        ];

        items = _.filter(items, function (i) {
            var valid = true;
            if (i.rule) {
                if (system.rules) {
                    var rule = _.find(system.rules, function(r){
                        return r.alias === i.rule;
                    });
                    if(!rule || !rule.value){
                        valid = false;
                    }
                } else {
                    valid = false;
                }
            }
            return valid;
        });

        callback(items);
    }
}

module.exports = new Navigation();