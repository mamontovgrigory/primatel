import LoginStore from '../stores/LoginStore';

export default {
    'LOGIN_GET_LIST': {
        'channel': 'LOGIN_GET_LIST',
        'method': LoginStore.getList,
        'title': 'Get logins list',
        'type': 'function',
        'response': {
            'type': 'array',
            'items': 'string'
        }
    }
};