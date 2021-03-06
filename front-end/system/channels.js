import Breadcrumbs from '../modules/Breadcrumbs/Breadcrumbs';
import Navigation from '../modules/Navigation/Navigation';
import Shell from '../modules/Shell/Shell';
import Telephony from '../modules/Telephony/Telephony';

var accountSchema = {
    'id': {
        'type': 'string'
    },
    'name': {
        'type': 'string'
    },
    'account': {
        'type': 'boolean'
    },
    'password': {
        'type': 'boolean'
    }
};

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

var groupSchema = {
    'id': {
        'type': 'string'
    },
    'name': {
        'type': 'string'
    }
};

export default {

    /*#region breadcrumbs*/

    'ACCOUNTS_GET_LIST':
    {
        'channel': 'ACCOUNTS_GET_LIST',
        'url': '/get_accounts.php',
        'title': 'return accounts list',
        'response': {
            'type': 'array',
            'items': {
                'type': 'object',
                'properties': accountSchema
            }
        }
    },

    'ACCOUNTS_SAVE':
    {
        'channel': 'ACCOUNTS_SAVE',
        'url': '/account_save.php',
        'title': 'save account',
        'type': 'object',
        'properties': accountSchema
    },

    'ACCOUNTS_DELETE':
    {
        'channel': 'ACCOUNTS_DELETE',
        'title': 'delete account',
        'url': '/account_delete.php',
        'type': 'object',
        'properties': {
            'id': {
                'type': 'string'
            }
        }
    },

    /*#endregion*/


    /*#region breadcrumbs*/

    'AUTHORIZATION_LOGIN': {
        'channel': 'AUTHORIZATION_LOGIN',
        'url': '/login.php',
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
        'url': '/get_list_users.php',
        'title': 'Get clients list',
        'type': 'function',
        'response': {
            'type': 'array',
            'items': 'object'
        }
    },

    'TELEPHONY_GET_CALLS_TOTALS': {
        'channel': 'TELEPHONY_GET_CALLS_TOTALS',
        'url': '/get_calls_totals.php',
        'title': 'Get calls totals',
        'type': 'function',
        'response': {
            'type': 'array',
            'items': 'string'
        }
    },

    'TELEPHONY_GET_REPORT': {
        'channels': 'TELEPHONY_GET_REPORT',
        'method': Telephony.getReport,
        'title': 'Get report'
    },

    'TELEPHONY_GET_CALLS_DETAILS': {
        'channel': 'TELEPHONY_GET_CALLS_DETAILS',
        'url': '/get_calls_details.php',
        'title': 'Get calls details',
        'type': 'function'
    },

    'TELEPHONY_GET_CALL_RECORD': {
        'channel': 'TELEPHONY_GET_CALL_RECORD',
        'url': '/get_call_record.php',
        'title': 'Get call records',
        'type': 'function'
    },

    'TELEPHONY_GET_UPDATE_DATE': {
        'channel': 'TELEPHONY_GET_UPDATE_DATE',
        'url': '/get_update_date.php',
        'title': 'Get update date'
    },

    /*#endregion*/


    /*#region navigation*/

    NAVIGATION_GET_ITEMS:
    {
        'channel': 'NAVIGATION_GET_ITEMS',
        'title': 'Return navigation items (routes)',
        'method': Navigation.getItems,
        'response': {
            'type': 'array',
            'items': {
                'type': 'object',
                'properties': {
                    'name': {
                        'type': 'string'
                    },
                    'icon': {
                        'type': 'string'
                    },
                    'to': {
                        'type': 'string'
                    },
                    'src': {
                        'type': 'string'
                    },
                    'description': {
                        'type': 'string'
                    },
                    'roles': {
                        'type': 'array',
                        'items': {
                            'type': 'string'
                        }
                    }
                }
            }
        }
    },

    /*#endregion*/


    /*#region breadcrumbs*/

    SHELL_NOTIFICATION_SHOW:
    {
        'channel': 'SHELL_NOTIFICATION_SHOW',
        'title': 'Show notification',
        'method': Shell.notification,
        'type': 'object',
        'properties': {
            'text': {
                'type': 'string'
            }
        }
    },

    /*#endregion*/


    /*#region users*/

    USERS_GET_LIST:
    {
        'channel': 'USERS_GET_LIST',
        'title': '',
        'url': '/get_users.php',
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
        'url': '/user_save.php',
        'type': 'object',
        'properties': userSchema
    },

    USERS_DELETE:
    {
        'channel': 'USERS_DELETE',
        'title': '',
        'url': '/user_delete.php',
        'type': 'object',
        'properties': {
            'id': {
                'type': 'string'
            }
        }
    },

    USERS_GET_ACCOUNT:
    {
        'channel': 'USERS_GET_ACCOUNT',
        'title': '',
        'url': '/get_account.php'
    },

    /*#endregion*/

    /*#region groups*/

    GROUPS_GET_LIST:
    {
        'channel': 'GROUPS_GET_LIST',
        'title': '',
        'url': '/get_groups.php',
        'response': {
            'type': 'array',
            'items': {
                'type': 'object',
                'properties': groupSchema
            }
        }
    },

    GROUPS_SAVE:
    {
        'channel': 'GROUPS_SAVE',
        'title': '',
        'url': '/group_save.php',
        'type': 'object',
        'properties': groupSchema
    },

    GROUPS_DELETE:
    {
        'channel': 'GROUPS_DELETE',
        'title': '',
        'url': '/group_delete.php',
        'type': 'object',
        'properties': {
            'id': {
                'type': 'string'
            }
        }
    }

    /*#endregion*/
};