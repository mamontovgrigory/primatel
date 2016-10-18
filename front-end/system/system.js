import Main from '../app/components/Main/Main';
import Telephony from '../app/components/Telephony/Telephony';
import Users from '../app/components/Users/Users';

module.exports = {
    serverUrl: (NODE_ENV.trim() === 'development' ? 'http://localhost' : window.location.origin) + '/ajax',
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
            component: Users
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