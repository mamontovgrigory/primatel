class BreadcrumbsStore extends React.Component{
    constructor(){
        super();
    }
    getList(properties, callback){
        var breadcrumb = properties && properties.breadcrumb? properties.breadcrumb : null;
        var matrix = {
            crm: {
                id: 1,
                name: 'CRM',
                href: '/',
            },
            telephony: {
                id: 2,
                name: 'Телефония',
                href: '/telephony',
                parents: [
                    'crm'
                ]
            }
        };
        var breadcrumbs = [];

        if(breadcrumb && matrix[breadcrumb]){
            if(matrix[breadcrumb].parents){
                for(var i = 0; i < matrix[breadcrumb].parents.length; i++){
                    breadcrumbs.push(matrix[matrix[breadcrumb].parents[i]]);
                }
            }
            breadcrumbs.push(matrix[breadcrumb]);
        }
        callback(breadcrumbs);
    }
}

const breadcrumbsStore = new BreadcrumbsStore;
export default breadcrumbsStore;