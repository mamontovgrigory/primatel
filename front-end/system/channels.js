import BreadcrumbsStore from '../modules/Breadcrumbs/Breadcrumbs';

export default {
    'BREADCRUMBS_GET_LIST': {
        'channel': 'BREADCRUMBS_GET_LIST',
        'method': BreadcrumbsStore.getList,
        'title': 'Get breadcrumbs list',
        'type': 'function',
        'response': {
            'type': 'array',
            'items': 'string'
        }
    },

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
    }
};