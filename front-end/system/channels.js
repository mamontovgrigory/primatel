import Authorization from '../modules/Authorization/Authorization';
import Breadcrumbs from '../modules/Breadcrumbs/Breadcrumbs';

var userSchema = {
    'id': {
        'type': 'string'
    },
    'login': {
        'type': 'string'
    },
    'isAdmin': {
        'type': 'boolean'
    }
};

export default {

    /*#region breadcrumbs*/

    'AUTHORIZATION_LOGIN': {
        'channel': 'AUTHORIZATION_LOGIN',
        'method': Authorization.login,
        'title': 'login',
        'type': 'object',
        'properties': {
            'login': {
                'type': 'string'
            },
            'password': {
                'type': 'string'
            }
        },
        'response': {
            'type': 'object',
            'properties': {
                'success': {
                    'type': 'boolean'
                },
                'message': {
                    'type': 'string'
                }
            }
        }
    },

    /*#endregion*/


    /*#region breadcrumbs*/

    'BREADCRUMBS_GET_LIST': {
        'channel': 'BREADCRUMBS_GET_LIST',
        'method': Breadcrumbs.getList,
        'title': 'Get breadcrumbs list',
        'type': 'function',
        'response': {
            'type': 'array',
            'items': 'string'
        }
    },

    /*#endregion*/


    /*#region telephony*/

    'TELEPHONY_GET_LIST_USERS': {
        'channel': 'TELEPHONY_GET_LIST_USERS',
        'url': 'http://localhost/primatel/ajax/get_list_users.php',
        'title': 'Get clients list',
        'type': 'function',
        'response': {
            'type': 'array',
            'items': 'object'
        }
    },

    'TELEPHONY_GET_CALLS_TOTALS': {
        'channel': 'TELEPHONY_GET_CALLS_TOTALS',
        'url': 'http://localhost/primatel/ajax/get_calls_totals.php',
        'title': 'Get calls totals',
        'type': 'function',
        'response': {
            'type': 'array',
            'items': 'string'
        }
    },

    'TELEPHONY_GET_CALLS_DETAILS': {
        'channel': 'TELEPHONY_GET_CALLS_DETAILS',
        'url': 'http://localhost/primatel/ajax/get_calls_details.php',
        'title': 'Get calls details',
        'type': 'function',
    },

    /*#endregion*/


    /*#region users*/

    USERS_GET_LIST:
    {
        'channel': 'USERS_GET_LIST',
        'title': '',
        'url': 'http://localhost/primatel/ajax/get_users.php',
        'response': {
            'type': 'array',
            'items': {
                'type': 'object',
                'properties': userSchema
            }
        }
    },

    USERS_SAVE:
    {
        'channel': 'USERS_SAVE',
        'title': '',
        'url': 'http://localhost/primatel/ajax/user_save.php',
        'type': 'object',
        'properties': userSchema
    },

    USERS_DELETE:
    {
        'channel': 'USERS_DELETE',
        'title': '',
        'url': 'http://localhost/primatel/ajax/user_delete.php',
        'type': 'object',
        'properties': {
            'id': {
                'type': 'string'
            }
        }
    }

    /*#endregion*/
};