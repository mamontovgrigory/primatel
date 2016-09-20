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

    'CLIENTS_GET_LIST': {
        'channel': 'CLIENTS_GET_LIST',
        'url': '/Api/Clients/Get',
        'title': 'Get clients list',
        'type': 'function',
        'response': {
            'type': 'array',
            'items': 'string'
        }
    },

    'TELEPHONY_GET_SID': {
        'channel': 'TELEPHONY_GET_SID',
        'url': 'http://tp-api.primatel.ru/?svc=login&mode=json',
        'title': 'Get Primatel API sid',
        'type': 'object'
    },

    'TELEPHONY_LIST_USERS': {
        'channel': 'TELEPHONY_LIST_USERS',
        'url': 'http://tp-api.primatel.ru/?svc=listUsers&mode=json',
        'title': 'Get Primatel API listUsers',
        'type': 'object'
    },

    'TELEPHONY_GET_CALLS_TOTALS': {
        'channel': 'TELEPHONY_GET_CALLS_TOTALS',
        'url': '/Api/Telephony/GetCallTotals',
        'title': 'Get calls totals',
        'type': 'function',
        'response': {
            'type': 'array',
            'items': 'string'
        }
    },

    'TELEPHONY_GET_CALLS_DETAILS': {
        'channel': 'TELEPHONY_GET_CALLS_DETAILS',
        'url': '/Api/Telephony/GetCallsDetails',
        'title': 'Get calls details',
        'type': 'function',
    }
};