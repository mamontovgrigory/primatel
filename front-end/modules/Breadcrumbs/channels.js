import Breadcrumbs from './Breadcrumbs';

module.exports = {
    'getList': {
        'channel': 'BREADCRUMBS_GET_LIST',
        'method': Breadcrumbs.getList,
        'title': 'Get breadcrumbs list',
        'type': 'function',
        'response': {
            'type': 'array',
            'items': 'string'
        }
    },
};