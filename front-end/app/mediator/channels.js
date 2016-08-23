import BreadcrumbsStore from '../stores/BreadcrumbsStore';
import ClientsStore from '../stores/ClientsStore';
import TelephonyStore from '../stores/TelephonyStore';

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
        'method': ClientsStore.getList,
        'title': 'Get clients list',
        'type': 'function',
        'response': {
            'type': 'array',
            'items': 'string'
        }
    },

    'TELEPHONY_GET_CALLS_TOTALS': {
        'channel': 'TELEPHONY_GET_CALLS_TOTALS',
        'method': TelephonyStore.getCallTotals,
        'title': 'Get clients list',
        'type': 'function',
        'response': {
            'type': 'array',
            'items': 'string'
        }
    }
};