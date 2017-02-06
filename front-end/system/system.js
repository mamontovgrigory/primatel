import Main from '../app/components/Main/Main';
import Telephony from '../app/components/Telephony/Telephony';
import Users from '../app/components/Users/Users';
import Groups from '../app/components/Groups/Groups';

module.exports = {
    serverUrl: (NODE_ENV.trim() === 'development' ? 'http://ramazanavtsinov.myjino.ru' : window.location.origin) + '/ajax',
    routes: [
        {
            path: 'index',
            component: Main
        },
        {
            path: 'telephony',
            component: Telephony
        },
        {
            path: 'users',
            component: Users,
            rule: 'users_manage'
        },
        {
            path: 'groups',
            component: Groups,
            rule: 'groups_manage'
        }
    ],
    breadcrumbs: {
        index: {
            name: 'CRM',
            href: '/'
        },
        accounts: {
            name: 'Личные кабинеты',
            href: '/accounts',
            parents: [
                'index'
            ]
        },
        telephony: {
            name: 'Телефония',
            href: '/telephony',
            parents: [
                'index'
            ]
        },
        users: {
            name: 'Пользователи',
            href: '/users',
            parents: [
                'index'
            ]
        },
        groups: {
            name: 'Настройки групп',
            href: '/groups',
            parents: [
                'index'
            ]
        }
    },
    libs: {
        'audioplayer': {
            require: true
        },
        'materialize-css': {
            require: true
        }
    },
    modules: {
        'Authorization': {
            require: true
        },
        'Breadcrumbs': {
            require: true
        },
        'Clients': {
            require: true
        },
        'Telephony': {
            require: true
        }
        ,
        'Users': {
            require: true
        }
    },
    template: {
        name: 'Material'
    },
    format: {
        time: "HH:mm:ss",
        datetime: "HH:mm:ss DD.MM.YYYY",
        date: "DD.MM.YYYY"
    }
};