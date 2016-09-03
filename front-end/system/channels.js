import BreadcrumbsStore from '../modules/Breadcrumbs/Breadcrumbs';
import ClientsStore from '../modules/Clients/Clients';
import TelephonyStore from '../modules/Telephony/Telephony';

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
        'title': 'Get calls totals',
        'type': 'function',
        'response': {
            'type': 'array',
            'items': 'string'
        }
    },

    'TELEPHONY_GET_CALLS_DETAILS': {
        'channel': 'TELEPHONY_GET_CALLS_DETAILS',
        'method': TelephonyStore.getCallsDetails,
        'title': 'Get calls details',
        'type': 'function',
    }
};