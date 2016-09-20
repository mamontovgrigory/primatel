window.system = require('./system/system');

require('./libs/libs');
require('./modules/modules');

window.constants = require('./app/constants/constants');

window.channels = require('./system/channels');
window.mediator = require('./system/mediator');

if(channels && mediator){
    _.forEach(channels, function(properties) {
        mediator.subscribe(properties, function(data, callback){
            if(properties.url || properties.remoteUrl){
                $.ajax({
                    url: properties.url.indexOf('http://') === -1 ? 'http://localhost:8080' + properties.url : properties.url,
                    data: data,
                    success: function(response){
                        if(callback && typeof(callback) === 'function'){
                            callback(response);
                        }
                    }
                });
            }else if(properties.method && typeof(properties.method) === 'function'){
                properties.method(data, callback && typeof(callback) === 'function' ? callback : function(){});
            }
        });
    });
}

require('./system/router');