class Breadcrumbs{
    getList(properties, callback){
        var breadcrumb = properties && properties.breadcrumb? properties.breadcrumb : null;
        var matrix = {};
        try {
            matrix = system.breadcrumbs;
        } catch (e){
            console.error(e);
        }
        var breadcrumbs = [];

        if(breadcrumb && matrix[breadcrumb]){
            if(matrix[breadcrumb].parents){
                for(var i = 0; i < matrix[breadcrumb].parents.length; i++){
                    var parent = matrix[matrix[breadcrumb].parents[i]];
                    if(parent) breadcrumbs.push(parent);
                }
            }
            breadcrumbs.push(matrix[breadcrumb]);
        }
        callback(breadcrumbs);
    }
}

module.exports = new Breadcrumbs();