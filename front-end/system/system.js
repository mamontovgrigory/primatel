import Authorization from '../app/components/Authorization/Authorization';
import Telephony from '../app/components/Telephony/Telephony';
import Users from '../app/components/Users/Users';

module.exports = {
    routes: [
        {
            path: 'index',
            component: Authorization
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
        crm: {
            id: 1,
            name: 'CRM',
            href: '/',
        },
        telephony: {
            id: 2,
            name: 'Телефония',
            href: '/telephony'
        },
        users: {
            id: 3,
            name: 'Пользователи',
            href: '/users'
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
        'Breadcrumbs': {
            require: true
        },
        'Clients': {
            require: true
        },
        'Telephony': {
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